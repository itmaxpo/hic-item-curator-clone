import React, { useState } from 'react'
import ItemLayout from 'components/ItemLayout'
import GlobalInformation from './GlobalInformation'
import OfferVisualisation from './OfferVisualisation'
import TravelDocuments from './TravelDocuments'
import { EditingWrapper } from './styles'
import { Button, SecondaryButton, AlarmButton } from 'components/Button'
import { updateItemByProp, componentsBasedOnType, mockedItem } from './utils'

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
  const originalItem = match.params.id
  // TODO: Uncomment when have BE to get item by ID
  // const [isLoading, setIsLoading] = useState(false)
  const [item, setItem] = useState(originalItem.title || mockedItem)
  const [isEditing, setIsEditing] = useState(false)

  const onChange = (field, prop) => {
    setItem(updateItemByProp(item, field, prop))
  }
  // OnSave: Send request to BE, then update localCopy of the item
  // Cancel changes if BE returns error, store the changes locally (indexedDB?)
  const onSave = updatedItem => {
    // send BE request to store item
    setIsEditing(false)
  }

  const onEdit = () => {
    setIsEditing(true)
  }

  const onCancel = updatedItem => {
    setItem(originalItem.title || mockedItem)
    setIsEditing(!isEditing)
  }

  const onPreview = () => {
    setIsEditing(!isEditing)
  }

  return (
    <div>
      <EditingWrapper>
        {isEditing ? (
          <>
            <AlarmButton title={'cancel'} onClick={onCancel} />
            <SecondaryButton title={'preview'} onClick={onPreview} />
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
        tabs={['Global Information', 'Offer Visualisation', 'Travel Documents']}
        tabContents={[
          <GlobalInformation
            item={item}
            isEditing={isEditing}
            onChange={onChange}
            components={componentsBasedOnType(item.type)}
          />,
          <OfferVisualisation item={item} isEditing={isEditing} onChange={onChange} />,
          <TravelDocuments item={item} isEditing={isEditing} onChange={onChange} />
        ]}
      />
    </div>
  )
}

export default ItemPage
