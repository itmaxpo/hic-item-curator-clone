import React, { useState, useEffect } from 'react'
import { get } from 'lodash'
import ItemLayout from './ItemLayout'
import * as queryString from 'query-string'
import OfferVisualisation from './OfferVisualisation'
import { EditingWrapper } from './styles'
import { Button, SecondaryButton, AlarmButton } from 'components/Button'
import {
  updateItemByProp,
  componentsBasedOnType,
  changeItemLocale,
  updateItemLocales
} from './utils'
import { flatten } from 'lodash'
import {
  getItemFieldsById,
  // getItemAttachmentsById,
  updateItemFields,
  getRoomsForAccommodation,
  getItemPolygonCoordinatesById
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
  // Receive here id of item from route and send request to BE to get the item
  const [item, setItem] = useState(null)
  const [originalItem, setOriginalItem] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingAdditionalInfo, setIsLoadingAdditionalInfo] = useState(true)

  const onChange = (field, prop) => {
    if (field === 'language') {
      // Update language in URL
      history.push(`?${queryString.stringify({ [field]: prop })}`)
      setItem(changeItemLocale(item, prop))
    } else {
      setItem(updateItemByProp(item, field, prop))
    }
  }
  // OnSave: Send request to BE, then update localCopy of the item
  // Cancel changes if BE returns error, store the changes locally (indexedDB?)
  const onSave = async () => {
    setIsEditing(false)

    const fields = transformToSupplyItem(item)
    // Updating current locale in local item
    const currentItemWithUpdatedLocale = {
      ...item,
      locales: updateItemLocales(item)
    }

    setItem(currentItemWithUpdatedLocale)

    try {
      await updateItemFields(item.id, fields, item.type)
      setOriginalItem(currentItemWithUpdatedLocale)
    } catch (e) {
      console.error(e)
    }
  }

  const onEdit = () => {
    setIsEditing(true)
  }

  const onCancel = () => {
    // Reset images to original version
    setItem(originalItem)
    setIsEditing(!isEditing)
  }

  // fetch item by query params
  useEffect(() => {
    const language = get(queryString.parse(window.location.search), 'language')

    async function fetchItem() {
      try {
        const { data } = await getItemFieldsById(match.params.id)
        const item = parseItemByType(data, language)

        setItem(item)
        setOriginalItem(item)
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

    async function fetchAdditionalinformation() {
      switch (item.type) {
        case AREA_ITEM_TYPE:
          const polygon = await getItemPolygonCoordinatesById(match.params.id)
          onChange('polygon', flatten(polygon['data'].coordinates))
          break
        case ACCOMMODATION_ITEM_TYPE:
          const accomRooms = await getRoomsForAccommodation(match.params.id)
          const rooms = accomRooms['data'].map(room => ({
            label: getFieldName(room) || 'No name',
            value: getFieldContent(room, FIELD_DESCRIPTION, language) || 'No description',
            badge: getFieldContent(room, FIELD_MEAL_BASE, language)
          }))
          onChange('rooms', rooms)
          break
        default:
          break
      }

      setIsLoadingAdditionalInfo(false)
    }
    // Only if it is first time laoded item and it is already set in localState
    if (isLoadingAdditionalInfo && item) {
      fetchAdditionalinformation()
    }
    // eslint-disable-next-line
  }, [isLoadingAdditionalInfo, item])

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
                onChange={onChange}
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
