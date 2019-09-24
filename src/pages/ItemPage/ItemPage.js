import React, { useState, useEffect, useRef, useReducer } from 'react'
import { get } from 'lodash'
import ItemLayout from './ItemLayout'
import * as queryString from 'query-string'
import OfferVisualisation from './OfferVisualisation'
import { EditingWrapper } from './styles'
import { Button, SecondaryButton, AlarmButton } from 'components/Button'
import { componentsBasedOnType, changeItemLocale, updateItemLocales } from './utils'
import { flatten } from 'lodash'
import {
  getItemFieldsById,
  // getItemAttachmentsById,
  updateItemFields,
  getRoomsForAccommodation,
  getItemPolygonCoordinatesById,
  getItemAttachmentsById,
  updateItemAttachmentsById
} from 'services/contentApi'
import Loader from 'components/Loader'
import {
  FIELD_DESCRIPTION,
  FIELD_MEAL_BASE,
  getFieldName,
  getFieldContent,
  AREA_ITEM_TYPE,
  ACCOMMODATION_ITEM_TYPE,
  parseItemByType,
  transformToSupplyItem
} from './itemParser'

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
 * @returns {Object} Item Page
 */
const ItemPage = ({ match, history }) => {
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
    if (field === 'language') {
      // Update language in URL
      history.push(`?${queryString.stringify({ [field]: prop })}`)
      dispatch({ type: 'updateAll', field, value: changeItemLocale(item, prop) })
    } else {
      dispatch({ type: 'updateField', field, value: prop })
    }
  }
  // OnSave: Send request to BE, then update localCopy of the item
  // Cancel changes if BE returns error, store the changes locally (indexedDB?)
  const onSave = async () => {
    setIsEditing(false)

    const fields = transformToSupplyItem(item)
    // Updating current locale in local item
    const currentLocales = updateItemLocales(item)
    dispatch({ type: 'updateField', field: 'locales', value: currentLocales })
    // TODO: HAve a PROMISE based if have any issues with || requests
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

  // fetch additionalInformation based on item.type
  useEffect(() => {
    const language = get(queryString.parse(window.location.search), 'language')
    let fetchedImages = [],
      offset = 0

    const fetchAdditionalInformation = async () => {
      const fetchImagesRecursively = async () => {
        const attachments = await getItemAttachmentsById(match.params.id, offset)
        fetchedImages.push(...attachments.data)
        offset += 50

        if (offset <= attachments.meta.total_count) {
          await fetchImagesRecursively(offset)
        } else {
          const attachments = await getItemAttachmentsById(match.params.id, offset)
          fetchedImages.push(...attachments.data)
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
        isVisible: !!get(att, 'tags.visible'),
        tags: att.tags
      }))
      // Only visibleImages have order
      const visiblePhotos = photos
        .filter(att => att.isVisible)
        .sort((img1, img2) => img1.order - img2.order)

      allImagesOriginal.current = photos
      visibleImagesOriginal.current = visiblePhotos

      onChange('allImages', photos)
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
            label: getFieldName(room) || 'No name',
            value: getFieldContent(room, FIELD_DESCRIPTION, language) || 'No description',
            badge: getFieldContent(room, FIELD_MEAL_BASE)
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

  return (
    <div>
      {!isLoading ? (
        <>
          <EditingWrapper>
            {isEditing ? (
              <>
                <AlarmButton title={'cancel'} onClick={onCancel} />
                <Button title={'save content'} onClick={onSave} />
              </>
            ) : (
              <SecondaryButton title={'edit content'} onClick={onEdit} />
            )}
          </EditingWrapper>

          <ItemLayout
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
