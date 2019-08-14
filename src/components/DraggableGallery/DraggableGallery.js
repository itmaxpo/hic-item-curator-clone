import React from 'react'
import { moveFromTo } from 'pages/Search/utils'
import { ItemList, Item, ImgWrapper, GalleryList } from './styles'

/**
 * Grid example of Sortable.js D'n'D
 *
 * @name DraggableGallery
 * @param {Array<any>} images
 * @param {Function} onChange
 * @param {Boolean} disabled Can handle disabled state
 *        to just show images without ability to drag'n'drop
 */
const DraggableGallery = ({ images, onChange, disabled = false }) => {
  const onDragEnd = evt => {
    const newArr = moveFromTo(images, evt.oldIndex, evt.newIndex)
    onChange(newArr)
  }

  const listItems = images.map((url, i) => (
    <Item key={i} data-id={i}>
      <ImgWrapper width={'100%'} src={url} alt={url} />
    </Item>
  ))

  return (
    <div>
      {disabled ? (
        <GalleryList>{listItems}</GalleryList>
      ) : (
        <ItemList
          // Sortable options (https://github.com/RubaXa/Sortable#options)
          options={{
            direction: 'horizontal',
            animation: 150,
            ghostClass: 'blue-background-class'
          }}
          onChange={(order, sortable, evt) => {
            onDragEnd(evt)
          }}
        >
          {listItems}
        </ItemList>
      )}
    </div>
  )
}

export default DraggableGallery
