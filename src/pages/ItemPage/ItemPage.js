import React, { useState, useEffect, useRef, useReducer, useCallback } from 'react'
import { Prompt } from 'react-router-dom'
import ItemLayout from './ItemLayout'
import queryString from 'query-string'
import OfferVisualisation from './OfferVisualisation'
import { EditingWrapper } from './styles'
import { Button, SecondaryButton, AlarmButton } from 'components/Button'
import { componentsBasedOnType, changeItemLocale, updateItemLocales, capitalizeBy } from './utils'
import { flatten, get } from 'lodash'
import {
  getItemFieldsById,
  updateItemFields,
  getRoomsForAccommodation,
  getItemPolygonCoordinatesById,
  getItemAttachmentsById,
  updateItemAttachmentsById
} from 'services/contentApi'
import Loader from 'components/Loader'
import { parseItemByType, transformToSupplyItem } from './itemParser'
import { onPageClosing } from 'utils/helpers'
import { AREA_ITEM_TYPE, ACCOMMODATION_ITEM_TYPE } from 'utils/constants'
import { useNotification } from 'components/Notification'

// Reducer to handle images all and visible changes
const reducer = (state, action) => {
  switch (action.type) {
    case 'updateField':
      return {
        ...state,
        [action.field]: action.value
      }
    case 'updateAll':
      return action.value
    default:
      throw new Error()
  }
}

/**
 * This is the Item Page component
 * Use it to render item and handle CRUD actions on Item.
 * Renders standard Layout of the page:
 *  - Renders Tabs to handle each tab (Each tab is a separate component)
 *  - Renders ItemLayout, that handle common Item properties:
 *    - Breadcrumbs, Title, Suppliers, Language
 *
 * @name ItemPage
 * @param {Object} match (access to query params to retreive item: id)
 * @param {Object} history from react-router
 * @returns {Object} Item Page
 */
const ItemPage = ({ match, history }) => {
  const { enqueueNotification } = useNotification()

  const allImagesOriginal = useRef([])
  const visibleImagesOriginal = useRef([])

  // Receive here id of item from route and send request to BE to get the item
  const [{ ...item }, dispatch] = useReducer(reducer, { id: match.params.id })
  const originalItem = useRef(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingAdditionalInfo, setIsLoadingAdditionalInfo] = useState(false)

  const onImagesAdd = (prop, images) => {
    // We need to update original to store all uploaded images
    allImagesOriginal.current = [...images, ...allImagesOriginal.current]
    onChange(prop, [...images, ...item.allImages])
  }

  const onChange = (field, prop) => {
    dispatch({ type: 'updateField', field, value: prop })
  }
  // OnSave: Send request to BE, then update localCopy of the item
  // Cancel changes if BE returns error, store the changes locally (indexedDB?)
  const onSave = async () => {
    setIsEditing(false)

    const fields = transformToSupplyItem(item)
    // Updating current locale in local item
    const currentLocales = updateItemLocales(item)
    dispatch({ type: 'updateField', field: 'locales', value: currentLocales })
    // TODO: Have a PROMISE based if have any issues with || requests
    try {
      const imagesNotVisibleAnymore = allImagesOriginal.current.filter(img => img.isVisible)
      // Update images
      await updateItemAttachmentsById(item.id, imagesNotVisibleAnymore, false)
      await updateItemAttachmentsById(item.id, item.visibleImages, true)
      // Update item fields
      await updateItemFields(item.id, fields, item.type)
      // Set original item to current item
      originalItem.current = { ...item, locales: currentLocales }
      // Update originals for Images
      allImagesOriginal.current = [
        ...allImagesOriginal.current.filter(img => !img.isVisible),
        ...item.visibleImages
      ]
      visibleImagesOriginal.current = [...item.visibleImages]
    } catch (e) {
      enqueueNotification({
        variant: 'error',
        message: 'Failed to edit item, try again or refresh the page'
      })
      console.error(e)
    }
  }

  const onEdit = () => {
    setIsEditing(true)
  }

  const onGeolocationUpdate = (geolocation, address) => {
    const updatedItem = { ...item, geolocation, address }
    dispatch({ type: 'updateAll', value: updatedItem })
  }

  const onCancel = () => {
    // Reset images to original version
    dispatch({ type: 'updateAll', value: originalItem.current })
    setIsEditing(!isEditing)
  }

  // fetch item by query params
  useEffect(() => {
    const language = get(queryString.parse(window.location.search), 'language') || 'en-GB'

    async function fetchItem() {
      try {
        const { data } = await getItemFieldsById(match.params.id)
        const item = parseItemByType(data, language)

        dispatch({ type: 'updateAll', value: item })
        originalItem.current = item
        setIsLoading(false)
        setIsLoadingAdditionalInfo(true)
      } catch (e) {
        console.warn(e)
      }
    }
    fetchItem()
  }, [match.params.id])

  const handlePageClose = useCallback(
    e => {
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

  // fetch additionalInformation based on item.type
  useEffect(() => {
    let fetchedImages = [],
      offset = 0

    const fetchAdditionalInformation = async () => {
      const fetchImagesRecursively = async () => {
        const attachments = await getItemAttachmentsById(match.params.id, offset)
        fetchedImages.push(...attachments.data)
        offset += attachments.data.length

        if (offset < attachments.meta.total_count) {
          await fetchImagesRecursively(offset)
        }
      }

      await fetchImagesRecursively()

      const photos = fetchedImages.map(att => ({
        id: att.uuid,
        order: get(att, 'tags.order'),
        value: att.url,
        isLoading: false,
        isError: false,
        isSelected: false,
        sourceKey: capitalizeBy(att.source_key),
        isVisible: !!get(att, 'tags.visible'),
        tags: att.tags
      }))
      // Only visibleImages have order
      const visiblePhotos = photos
        .filter(att => att.isVisible)
        .sort((img1, img2) => img1.order - img2.order)

      const allImages = photos.filter(att => !att.isVisible)

      allImagesOriginal.current = photos
      visibleImagesOriginal.current = visiblePhotos

      onChange('allImages', allImages)
      onChange('visibleImages', visiblePhotos)

      originalItem.current = {
        ...originalItem.current,
        allImages: allImagesOriginal.current,
        visibleImages: visibleImagesOriginal.current
      }

      switch (item.type) {
        case AREA_ITEM_TYPE:
          const polygon = await getItemPolygonCoordinatesById(match.params.id)
          const parsedPolygon = flatten(polygon['data'].coordinates)
          onChange('polygon', parsedPolygon)
          originalItem.current = { ...originalItem.current, polygon: parsedPolygon }
          break
        case ACCOMMODATION_ITEM_TYPE:
          const accomRooms = await getRoomsForAccommodation(match.params.id)

          const rooms = accomRooms['data'].map(room => ({
            label: get(room, 'fields.name.0.content') || 'No name',
            value: get(room, 'fields.description.0.content') || 'No description',
            badge: get(room, 'fields.meal_base.0.content')
          }))

          onChange('rooms', rooms)
          originalItem.current = { ...originalItem.current, rooms }
          break
        default:
          break
      }
      setIsLoadingAdditionalInfo(false)
    }

    // Only if it is first time laoded item and it is already set in localState
    if (isLoadingAdditionalInfo) {
      fetchAdditionalInformation()
    }
    // eslint-disable-next-line
  }, [isLoadingAdditionalInfo])

  useEffect(() => {
    // failsafe for when the item hasn't loaded yet.
    // initially all we have is the item ID but no locale
    if (!item.locales) return
    const { language } = queryString.parse(history.location.search)

    const localeUpdatedItem = changeItemLocale(item, language)
    dispatch({ type: 'updateAll', value: localeUpdatedItem })
    // originalItem has to reflect the item original structure based on a specific language
    originalItem.current = localeUpdatedItem
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history.location.search])

  return (
    <div data-test={'item-page'}>
      {/* Prevent any route changes in EditingMode */}
      <Prompt when={isEditing} message={() => `If you continue, all changes will be lost`} />
      {!isLoading ? (
        <>
          <EditingWrapper>
            {isEditing ? (
              <>
                <AlarmButton data-test={'cancel-item-button'} title={'cancel'} onClick={onCancel} />
                <Button data-test={'save-item-button'} title={'save content'} onClick={onSave} />
              </>
            ) : (
              <SecondaryButton
                data-test={'edit-item-button'}
                title={'edit content'}
                onClick={onEdit}
              />
            )}
          </EditingWrapper>

          <ItemLayout
            history={history}
            item={item}
            isEditing={isEditing}
            onChange={onChange}
            tabs={['Offer Visualisation']}
            tabContents={[
              <OfferVisualisation
                item={item}
                isLoadingAdditionalInfo={isLoadingAdditionalInfo}
                isEditing={isEditing}
                onImagesAdd={onImagesAdd}
                onChange={onChange}
                onGeolocationUpdate={onGeolocationUpdate}
                components={componentsBasedOnType(item.type)}
              />
            ]}
          />
        </>
      ) : (
        <Loader top={'47.5%'} />
      )}
    </div>
  )
}

export default ItemPage
