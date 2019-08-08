import React, { useState } from 'react'
import DraggableGallery from 'components/DraggableGallery'

// Example of image URL's to send to DraggableGallery
const tasksArr = [
  'https://loremflickr.com/320/240/travel',
  'https://loremflickr.com/320/240/travel',
  'https://loremflickr.com/320/240/travel',
  'https://loremflickr.com/320/240/travel',
  'https://loremflickr.com/320/240/travel',
  'https://loremflickr.com/320/240/travel',
  'https://loremflickr.com/320/240/travel',
  'https://loremflickr.com/320/240/dance'
]

/**
 * This is an example of the DraggableGallery components put together
 *
 * @name DraggableGalleryExample
 * @returns {Object} DraggableGallery Example
 */
const DraggableGalleryExample = () => {
  const [photos, setPhotos] = useState(tasksArr)

  const onImagesUpdate = items => {
    setPhotos(items)
  }

  return <DraggableGallery images={photos} onChange={onImagesUpdate} />
}

export default DraggableGalleryExample
