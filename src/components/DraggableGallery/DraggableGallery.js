import React from 'react'
import { moveFromTo } from 'pages/Search/utils'
import { ItemList, Item, ImgWrapper } from './styles'

/**
 * Grid example of Sortable.js D'n'D
 *
 * @name DraggableGallery
 * @param {Array<any>} images
 * @param {Function} onChange
 */
const DraggableGallery = ({ images, onChange }) => {
  const onDragEnd = evt => {
    const newArr = moveFromTo(images, evt.oldIndex, evt.newIndex)
    onChange(newArr)
  }

  const listItems = images.map((val, i) => (
    <Item key={i} data-id={i}>
      <ImgWrapper width={'100%'} src={val} />
    </Item>
  ))

  return (
    <div>
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
    </div>
  )
}

export default DraggableGallery
