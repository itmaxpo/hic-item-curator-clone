import React, { useState, useEffect } from 'react'
import ItemLayout from './ItemLayout'
import OfferVisualisation from './OfferVisualisation'
import { EditingWrapper } from './styles'
import { Button, SecondaryButton, AlarmButton } from 'components/Button'
import {
  updateItemByProp,
  updateItemKey,
  componentsBasedOnType,
  mockedItem,
  AREA_ITEM_TYPE,
  ACCOMMODATION_ITEM_TYPE
} from './utils'
import { cloneDeep } from 'lodash'
import {
  getItemFieldsById,
  // getItemAttachmentsById,
  // updateItemFields,
  getRoomsForAccommodation,
  getItemPolygonCoordinatesById
} from 'services/contentApi'

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
  // const originalItem = match.params.id
  const originalItem = mockedItem
  // TODO: Uncomment when have BE to get item by ID
  // const [isLoading, setIsLoading] = useState(false)
  const [item, setItem] = useState(cloneDeep(originalItem))
  const [isEditing, setIsEditing] = useState(false)

  const onChangeOfferVisualisation = (field, prop) => {
    setItem(updateItemKey(item, 'offerVisualisation', field, prop))
  }

  const onChange = (field, prop) => {
    setItem(updateItemByProp(item, field, prop))
  }
  // OnSave: Send request to BE, then update localCopy of the item
  // Cancel changes if BE returns error, store the changes locally (indexedDB?)
  const onSave = updatedItem => {
    // send BE request to store item + images
    setIsEditing(false)
  }

  const onEdit = () => {
    setIsEditing(true)
  }

  const onCancel = () => {
    // Reset images to original version
    setItem(mockedItem)
    setIsEditing(!isEditing)
  }

  // fetch item by query params
  useEffect(() => {
    async function fetchItem() {
      try {
        const { data } = await getItemFieldsById(match.params.id)
        console.log(data.item_type)
        if (data.item_type === AREA_ITEM_TYPE) {
          const { data } = await getItemPolygonCoordinatesById(match.params.id)
          console.log(data)
        }

        if (data.item_type === ACCOMMODATION_ITEM_TYPE) {
          const { data } = await getRoomsForAccommodation(match.params.id)
          console.log(data)
        }
        console.log(data)
        // return data
      } catch (e) {
        console.warn(e)
      }
    }
    fetchItem()
  }, [match.params.id])

  return (
    <div>
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
            offerVisualisation={item.offerVisualisation}
            isEditing={isEditing}
            onChange={onChangeOfferVisualisation}
            components={componentsBasedOnType(item.type)}
          />
        ]}
      />
    </div>
  )
}

export default ItemPage
