import React, { lazy, Suspense, useState, useEffect, useRef, useReducer, useCallback } from 'react'
import queryString from 'query-string'
import { useParams, useSearchParams } from 'react-router-dom'
import { flatten, get } from 'lodash'

import { ItemLayoutLoader, TabContentLoader } from './styles'
import { componentsBasedOnType, changeItemLocale, updateItemLocales, capitalizeBy } from './utils'
import {
  getItemFieldsById,
  updateItemFields,
  getItemPolygonCoordinatesById,
  getItemAttachmentsById,
  updateItemAttachmentsById
} from 'services/contentApi'
import Loader from 'components/Loader'
import { parseItemByType, transformToSupplyItem, FIELD_FRONT_DESK_PHONE } from './itemParser'
import { onPageClosing } from 'utils/helpers'
import { AREA_ITEM_TYPE } from 'utils/constants'
import { useFieldsRef } from './useFieldsRef'
import { parsePhoneNumber } from './OfferVisualisation/utils'
import { usePrompt } from 'components/RouterPrompt'
import { useNotification } from 'components/Notification'
import * as Sentry from '@sentry/browser'

const ItemLayout = lazy(() => import(/* webpackChunkName: "ItemLayout" */ './ItemLayout'))
const OfferVisualisation = lazy(() =>
  import(/* webpackChunkName: "OfferVisualisation" */ './OfferVisualisation')
)

// Reducer to handle images all and visible changes
const reducer = (state, action) => {
  switch (action.type) {
    case 'updateField':
      return {
        ...state,
        [action.field]: action.value
      }
    case 'updateFields': {
      return {
        ...state,
        ...action.value
      }
    }
    case 'updateAll':
      return action.value
    default:
      throw new Error()
  }
}

/*
 * This is the Item Page component
 * Use it to render item and handle CRUD actions on Item.
 * Renders standard Layout of the page:
 *  - Renders Tabs to handle each tab (Each tab is a separate component)
 *  - Renders ItemLayout, that handle common Item properties:
 *    - Breadcrumbs, Title, Suppliers, Language
 *
 * @name ItemPage
 * @returns {Object} Item Page
 */
const ItemPage = () => {
  const { enqueueNotification } = useNotification()
  const allImagesOriginal = useRef([])
  const visibleImagesOriginal = useRef([])
  const { id } = useParams()
  const [urlParams] = useSearchParams()
  const language = urlParams.get('language')

  // Receive here id of item from route and send request to BE to get the item
  const [{ ...item }, dispatch] = useReducer(reducer, { id })
  const originalItem = useRef(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingAdditionalInfo, setIsLoadingAdditionalInfo] = useState(true)
  const { cleanFields, updateFieldRef } = useFieldsRef(item)
  const [countryCode, setCountryCode] = useState('DE')
  const [phoneTouched, setPhoneTouched] = useState(false)
  const phone = parsePhoneNumber(item[FIELD_FRONT_DESK_PHONE], countryCode)
  usePrompt('If you continue, all changes will be lost', isEditing)

  const updateAttachments = async () => {
    try {
      const imagesNotVisibleAnymore = allImagesOriginal.current.filter((img) => img.isVisible)
      await updateItemAttachmentsById(item.id, 'accommodation', imagesNotVisibleAnymore, false)
      await updateItemAttachmentsById(item.id, 'accommodation', item.visibleImages, true)
    } catch (e) {
      enqueueNotification({
        variant: 'error',
        message: 'Failed to update images. Please refresh the page and try again'
      })
      console.error(e)
    }
  }

  const onImagesAdd = (prop, images) => {
    // We need to update original to store all uploaded images
    allImagesOriginal.current = [...images, ...allImagesOriginal.current]
    onChange(prop, [...images, ...item.allImages])
  }

  const onChange = useCallback((field, prop, oldPhoneNumber) => {
    if (field === FIELD_FRONT_DESK_PHONE && oldPhoneNumber !== prop) {
      setPhoneTouched(true)
    }
    dispatch({ type: 'updateField', field, value: prop })
  }, [])

  // OnSave: Send request to BE, then update localCopy of the item
  // Cancel changes if BE returns error, store the changes locally (indexedDB?)
  const onSave = async () => {
    setIsEditing(false)

    let fields = transformToSupplyItem(item)
    // Updating current locale in local item
    const currentLocales = updateItemLocales(item)
    dispatch({ type: 'updateField', field: 'locales', value: currentLocales })

    // The ranking field in the item is auto created when getting the item res by calling transformToSupplyItem
    // Remove the ranking field before sending to BE when there is no existing ranking and the updated ranking is null to avoid BE error
    fields = cleanFields(fields, item, phoneTouched)

    try {
      await Promise.all([updateAttachments(), updateItemFields(item.id, fields, item.type)]).then(
        ([attachment, fields]) => {
          const error = attachment?.error ?? fields?.error
          if (error) throw new Error(error)

          // Set original item to current item
          originalItem.current = { ...item, locales: currentLocales }
          // Update originals for Images
          allImagesOriginal.current = [
            ...allImagesOriginal.current.filter((img) => !img.isVisible),
            ...item.visibleImages
          ]
          visibleImagesOriginal.current = [...item.visibleImages]
        }
      )
      // Update the existing ranking after making an update
      updateFieldRef(item)
    } catch (e) {
      enqueueNotification({
        variant: 'error',
        message: `Failed to edit item ` + e.message
      })
      console.error(e)
    }
  }

  const onEdit = () => {
    setIsEditing(true)
  }

  const onGeolocationUpdate = useCallback((geolocation, address) => {
    dispatch({ type: 'updateFields', value: { geolocation, address } })
  }, [])

  const onCancel = () => {
    // Reset images to original version
    dispatch({ type: 'updateAll', value: originalItem.current })
    setIsEditing(!isEditing)
  }

  // fetch item by query params
  useEffect(() => {
    let fetchedImages = [],
      offset = 0

    const language = queryString.parse(window.location.search)?.language ?? 'en-GB'
    const fetchAdditionalInformation = async (item) => {
      switch (item.type) {
        case AREA_ITEM_TYPE:
          const polygon = await getItemPolygonCoordinatesById(id)
          const parsedPolygon = flatten(polygon['data'].coordinates)
          onChange('polygon', parsedPolygon)
          originalItem.current = { ...originalItem.current, polygon: parsedPolygon }
          break
        default:
          break
      }
    }

    async function fetchItem() {
      try {
        const { data } = await getItemFieldsById(id)
        const results = parseItemByType(data, language)
        // Record the initial ranking on item load to avoid updating existing falsy ranking to null again
        updateFieldRef(results)
        return results
      } catch (e) {
        console.warn(e)
      }
    }

    async function fetchAttachments() {
      const fetchImagesRecursively = async () => {
        const attachments = await getItemAttachmentsById(id, offset)
        fetchedImages.push(...attachments.data)
        offset += attachments.data.length

        if (offset < attachments.meta.total_count) {
          await fetchImagesRecursively(offset)
        }
      }

      await fetchImagesRecursively()

      const photos = fetchedImages.map((att) => ({
        id: att.uuid,
        order: get(att, 'tags.order'),
        value: att.url,
        s3_key: att.s3_key,
        isLoading: false,
        isError: false,
        isSelected: false,
        sourceKey: capitalizeBy(att.source_key),
        isVisible: att.tags?.visible || !att.tags?.hasOwnProperty('visible'),
        tags: att.tags
      }))
      // Only visibleImages have order
      const visibleImages = photos
        .filter((att) => att.isVisible)
        .sort((img1, img2) => img1.order - img2.order)

      const allImages = photos.filter((att) => !att.isVisible)

      allImagesOriginal.current = photos
      visibleImagesOriginal.current = visibleImages

      return {
        allImages,
        visibleImages
      }
    }

    async function fetchAllItemAttributes() {
      setIsLoading(true)
      setIsLoadingAdditionalInfo(true)

      await Promise.all([fetchItem(), fetchAttachments()])
        .then(async (values) => {
          const [item, attachments] = values
          const itemWithAttachments = { ...item, ...attachments }

          originalItem.current = { ...itemWithAttachments }
          dispatch({ type: 'updateAll', value: itemWithAttachments })
          setIsLoading(false)

          if (itemWithAttachments.type === AREA_ITEM_TYPE) {
            await fetchAdditionalInformation(itemWithAttachments)
          }

          setIsLoadingAdditionalInfo(false)
        })
        .catch(Sentry.captureException)
    }

    fetchAllItemAttributes()
  }, [id, onChange, updateFieldRef])

  const handlePageClose = useCallback(
    (e) => {
      if (isEditing) {
        onPageClosing(e)
      }
    },
    [isEditing]
  )

  useEffect(() => {
    window.addEventListener('beforeunload', handlePageClose)

    return () => {
      window.removeEventListener('beforeunload', handlePageClose)
    }
  }, [handlePageClose])

  useEffect(() => {
    // failsafe for when the item hasn't loaded yet.
    // initially all we have is the item ID but no locale
    if (!item.locales) return
    const localeUpdatedItem = changeItemLocale(item, language)
    dispatch({ type: 'updateAll', value: localeUpdatedItem })
    // originalItem has to reflect the item original structure based on a specific language
    originalItem.current = localeUpdatedItem
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [language])

  return (
    <div data-test={'item-page'}>
      {!isLoading ? (
        <Suspense fallback={<ItemLayoutLoader />}>
          <ItemLayout
            item={item}
            isEditing={isEditing}
            onEdit={onEdit}
            onChange={onChange}
            onCancel={onCancel}
            onSave={onSave}
            onCountryUpdate={setCountryCode}
            tabs={['Offer Visualisation']}
            tabContents={[
              <Suspense fallback={<TabContentLoader />}>
                <OfferVisualisation
                  item={item}
                  phone={phone}
                  isLoadingAdditionalInfo={isLoadingAdditionalInfo}
                  isEditing={isEditing}
                  onImagesAdd={onImagesAdd}
                  onChange={onChange}
                  onGeolocationUpdate={onGeolocationUpdate}
                  components={componentsBasedOnType(item.type)}
                />
              </Suspense>
            ]}
          />
        </Suspense>
      ) : (
        <Loader top={'47.5%'} />
      )}
    </div>
  )
}

export default ItemPage
