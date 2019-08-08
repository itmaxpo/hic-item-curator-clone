import React from 'react'
import TabsWrapper from 'components/Tabs'
import MapExample from './MapExample'
import DraggableGalleryExample from './DraggableGalleryExample'

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
      <br />
      <h3>Tabs</h3>
      <hr />
      <TabsWrapper
        tabs={['Stuff 1', 'Stuff 2', 'Stuff 3']}
        tabContents={[<p>Hello 1</p>, 123, 123]}
      />
      <br />
      <h3>Map</h3>
      <hr />
      <MapExample />
      <br />
      <h3>Gallery</h3>
      <hr />
      <DraggableGalleryExample />
    </div>
  )
}

export default SandboxPage
