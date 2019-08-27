import React, { useState } from 'react'
import { moveFromTo, addElementToIndex } from 'pages/Search/utils'
import {
  ItemList,
  GalleryList,
  GalleryTitle,
  GalleryWrapper,
  PlaceholderText,
  BottomLine,
  DeleteIconWrapper,
  ToggleAll
} from './styles'
import ItemPhoto from './ItemPhoto'
import ImageCarousel from 'components/Carousel'
import { DeleteIcon, GlyphChevronDownIcon } from 'components/Icon'
import { Tooltip, Base } from '@tourlane/tourlane-ui'

/**
 * Grid example of Sortable.js D'n'D
 *
 * @name DraggableGallery
 * @param {Array<{ isLoading: Boolean, value: String }>} images
 * @param {String} placeholder (placeholder if there are no items)
 * @param {String} title (title of the gallery)
 * @param {options} options for SortableJS
 * @param {Function} onChange
 * @param {Boolean} disabled Can handle disabled state
 *        to just show images without ability to drag'n'drop
 */
const DraggableGallery = ({
  images,
  onChange,
  placeholder = 'Drop files here',
  title = 'Images',
  options = null,
  disabled = false,
  isVisible = false
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isAllShown, setIsAllShown] = useState(false)

  const imageURLs = images.map(image => image.value)
  const selectedImages = images.filter(image => image.isSelected)

  const actualOptions = options
    ? options
    : {
        direction: 'horizontal',
        animation: 150
      }

  const onDragEnd = (order, evt) => {
    let updatedImages = [],
      type
    // Checking if element is existing in Array - if not it is REMOVE action
    if (!order.includes(`${evt.oldIndex}`)) {
      updatedImages = images.filter((url, index) => index !== evt.oldIndex)
      localStorage.setItem('imageUrlMoved', JSON.stringify(images[evt.oldIndex]))
      type = 'remove'
      // If element exists, but there more items - it is ADD action
    } else if (order.length > images.length) {
      updatedImages = addElementToIndex(
        images,
        evt.newIndex,
        JSON.parse(localStorage.getItem('imageUrlMoved'))
      )
      // In other case element was just moved inside array
    } else {
      updatedImages = moveFromTo(images, evt.oldIndex, evt.newIndex)
    }

    onChange(updatedImages, type)
  }
  // When checkbox is clicked (Now disabled)
  const onItemSelected = (index, isSelected) => {
    // update isSelected value and onChange images
    const updatedImages = images.map((image, i) =>
      i === index ? { ...image, isSelected: !image.isSelected } : image
    )
    onChange(updatedImages)
  }
  // When DeleteIcon is clicked (Now disabled)
  const onDelete = () => {
    const updatedImages = images.filter(image => !image.isSelected)
    onChange(updatedImages)
  }

  const onItemViewClick = () => {
    // Just show gallery
    setIsOpen(true)
  }

  const onClose = () => {
    setIsOpen(false)
  }

  const onShowAllClick = () => {
    setIsAllShown(!isAllShown)
  }

  // generate list of images in ItemPhoto component
  const listItems = images.map((image, i) => (
    <ItemPhoto
      key={i}
      index={i}
      image={image}
      isVisible={isVisible}
      disabled={disabled}
      onItemViewClick={onItemViewClick}
      onItemSelected={onItemSelected}
    />
  ))

  return (
    <GalleryWrapper
      direction={'ttb'}
      alignItems={'center'}
      isVisible={isVisible}
      disabled={disabled}
    >
      {/* TODO: This Icon would be shown when enable showing checkboxes to select images */}
      {selectedImages.length > 0 && !disabled && (
        <DeleteIconWrapper>
          <Tooltip position={'top'} trigger={'hover'} content={<Base>Delete</Base>}>
            <DeleteIcon onClick={onDelete} />
          </Tooltip>
        </DeleteIconWrapper>
      )}
      {disabled ? (
        <>
          {images.length > 0 && <GalleryTitle isVisible={isVisible}>{title}</GalleryTitle>}
          <GalleryList isAllShown={isAllShown}>
            {images.length > 0 ? listItems : <PlaceholderText>{placeholder}</PlaceholderText>}
            {/* If there are more then 10 images add ToggleAll element to toggle vibility of all images */}
            {images.length > 10 && (
              <ToggleAll isAllShown={isAllShown}>
                {`${isAllShown ? 'Hide' : 'Show'}`} all ({images.length})
                <GlyphChevronDownIcon onClick={onShowAllClick} />
              </ToggleAll>
            )}
          </GalleryList>
        </>
      ) : (
        <>
          {images.length > 0 && <GalleryTitle isVisible={isVisible}>{title}</GalleryTitle>}
          <ItemList
            // Sortable options (https://github.com/RubaXa/Sortable#options)
            options={actualOptions}
            onChange={(order, sortable, evt) => onDragEnd(order, evt)}
          >
            {images.length > 0 ? listItems : <PlaceholderText>{placeholder}</PlaceholderText>}
          </ItemList>
        </>
      )}
      {isVisible && <BottomLine />}

      <ImageCarousel images={imageURLs} open={isOpen} onClose={onClose} />
    </GalleryWrapper>
  )
}

export default DraggableGallery
