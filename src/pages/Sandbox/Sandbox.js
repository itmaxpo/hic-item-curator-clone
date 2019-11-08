import React from 'react'
import MapExample from './MapExample'
import DraggableGalleryExample from './DraggableGalleryExample'
import CarouselExample from './CarouselExample'
import ImageUploaderExample from './ImageUploaderExample'
/**
 * This is the Sandbox Page component
 * Use it to play with components
 *
 * @name Sandbox
 * @returns {Object} Sandbox Page
 */
const SandboxPage = () => {
  return (
    <div style={{ margin: '20px auto', width: 600 }}>
      <div>Welcome to IC Sandbox.</div>
      <h3>Drag'n'Drop Area</h3>
      <hr />
      {/* <DragAndDropAreaExample files={imagesURLS} /> */}
      <br />
      <h3>Map</h3>
      <hr />
      <MapExample />
      <br />
      <h3>Gallery</h3>
      <hr />
      <DraggableGalleryExample />
      <br />
      <h3>Carousel</h3>
      <hr />
      <CarouselExample />
      <br />
      <h3>Image uploader</h3>
      <hr />
      <ImageUploaderExample />
    </div>
  )
}

export default SandboxPage
