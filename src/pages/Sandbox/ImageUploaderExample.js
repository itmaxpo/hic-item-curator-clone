import React, { useState } from 'react'
import ImageUploader from 'components/ImageUploader'
import { mockedItem } from 'pages/ItemPage/utils'
import { Button } from '@tourlane/tourlane-ui'

/**
 * This is an example of the ImageUploader components put together
 *
 * @name ImageUploaderExample
 * @returns {Object} ImageUploader Example
 */
const ImageUploaderExample = () => {
  const [isEditing, setIsEditing] = useState(false)

  const onImagesUpdate = items => {
    console.log(items)
  }

  const onEditingChange = () => {
    setIsEditing(!isEditing)
  }

  return (
    <>
      <Button onClick={onEditingChange}>Editing mode</Button>
      <ImageUploader
        itemId={mockedItem.id}
        isEditing={isEditing}
        images={mockedItem.offerVisualisation.photos}
        onImagesUpdate={onImagesUpdate}
      />
    </>
  )
}

export default ImageUploaderExample
