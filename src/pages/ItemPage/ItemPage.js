import React, { useState, useEffect } from 'react'
import ItemLayout from './ItemLayout'
import OfferVisualisation from './OfferVisualisation'
import { EditingWrapper } from './styles'
import { Button, SecondaryButton, AlarmButton } from 'components/Button'
import {
  updateItemByProp,
  updateItemKey,
  componentsBasedOnType,
  AREA_ITEM_TYPE,
  ACCOMMODATION_ITEM_TYPE,
  parseItemByType,
  transformToSupplyItem
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
import { FIELD_DESCRIPTION, FIELD_MEAL_BASE, getFieldName, getFieldContent } from './itemParser'

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
const ItemPage = ({ match }) => {
  // Receive here id of item from route and send request to BE to get the item
  const [item, setItem] = useState(null)
  const [originalItem, setOriginalItem] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingAdditionalInfo, setIsLoadingAdditionalInfo] = useState(true)

  const onChangeOfferVisualisation = (field, prop) => {
    setItem(updateItemKey(item, 'offerVisualisation', field, prop))
  }

  const onChange = (field, prop) => {
    setItem(updateItemByProp(item, field, prop))
  }
  // OnSave: Send request to BE, then update localCopy of the item
  // Cancel changes if BE returns error, store the changes locally (indexedDB?)
  const onSave = async () => {
    setIsEditing(false)
    const fields = transformToSupplyItem(item)
    setItem(item)

    try {
      await updateItemFields(item.id, fields, item.type)
      setOriginalItem(item)
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
    async function fetchItem() {
      try {
        let item = {}
        const { data } = await getItemFieldsById(match.params.id)
        item = parseItemByType(data)

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
    async function fetchAdditionalinformation() {
      switch (item.type) {
        case AREA_ITEM_TYPE:
          const polygon = await getItemPolygonCoordinatesById(match.params.id)
          onChangeOfferVisualisation('polygon', flatten(polygon['data'].coordinates))
          break
        case ACCOMMODATION_ITEM_TYPE:
          const accomRooms = await getRoomsForAccommodation(match.params.id)
          const rooms = accomRooms['data'].map(room => ({
            title: getFieldName(room) || 'No name',
            description: getFieldContent(room, FIELD_DESCRIPTION) || 'No description',
            badge: getFieldContent(room, FIELD_MEAL_BASE)
          }))
          onChangeOfferVisualisation('rooms', rooms)
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
                itemId={item.id}
                isLoadingAdditionalInfo={isLoadingAdditionalInfo}
                offerVisualisation={item.offerVisualisation}
                isEditing={isEditing}
                onChange={onChangeOfferVisualisation}
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
