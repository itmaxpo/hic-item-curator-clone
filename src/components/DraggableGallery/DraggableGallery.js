import React, { lazy, Suspense, useState } from 'react'
import { moveFromTo, addElementToIndex } from 'pages/Search/utils'
import {
  ItemList,
  GalleryList,
  GalleryTitle,
  GalleryWrapper,
  PlaceholderText,
  BottomLine,
  DeleteIconWrapper,
  ToggleAll,
  ToggleWrapper
} from './styles'
import ItemPhoto from './ItemPhoto'
import { DeleteIcon, GlyphChevronDownIcon } from 'components/Icon'
import { Tooltip, Base } from '@tourlane/tourlane-ui'
import { CarouselLoader } from 'components/Carousel'

const ImageCarousel = lazy(() =>
  import(/* webpackChunkName: "ImageCarousel" */ 'components/Carousel')
)

/**
 * Grid example of Sortable.js D'n'D
 *
 * @name DraggableGallery
 * @param {Array<{ isLoading: Boolean, value: String }>} images
 * @param {String} placeholder (placeholder if there are no items)
 * @param {String} title (title of the gallery)
 * @param {options} options for SortableJS
 * @param {Function} onChange
 * @param {Function} onDelete
 * @param {Boolean} disabled Can handle disabled state
 *        to just show images without ability to drag'n'drop
 */
const DraggableGallery = ({
  images,
  onChange,
  onDelete = () => {},
  placeholder = 'Drop files here',
  title = 'Images',
  options = null,
  disabled = false,
  isVisible = false
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isAllShown, setIsAllShown] = useState(false)
  const [clickedItemIndex, setClickedItemIndex] = useState(0)

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
  const onDeleteItems = () => {
    onDelete(images)
  }

  const onItemViewClick = i => {
    // Just show gallery
    setClickedItemIndex(i)
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
      key={image.id}
      index={i}
      image={image}
      badgeText={image.sourceKey}
      isVisible={isVisible}
      disabled={disabled}
      onItemViewClick={() => onItemViewClick(i)}
      onItemSelected={onItemSelected}
    />
  ))

  return (
    <GalleryWrapper
      id={title
        .toLowerCase()
        .split(' ')
        .join('-')}
      direction={'ttb'}
      alignItems={'center'}
      isVisible={isVisible}
      disabled={disabled}
    >
      {/* TODO: This Icon would be shown when enable showing checkboxes to select images */}
      {selectedImages.length > 0 && !disabled && (
        <DeleteIconWrapper>
          <Tooltip position={'top'} trigger={'hover'} content={<Base>Delete</Base>}>
            <DeleteIcon onClick={onDeleteItems} />
          </Tooltip>
        </DeleteIconWrapper>
      )}
      {disabled ? (
        <>
          {images.length > 0 && <GalleryTitle isVisible={isVisible}>{title}</GalleryTitle>}
          <GalleryList isAllShown={isAllShown}>
            {images.length > 0 ? listItems : <PlaceholderText>{placeholder}</PlaceholderText>}
          </GalleryList>

          {images.length > 10 && (
            <ToggleWrapper onClick={onShowAllClick}>
              <ToggleAll isAllShown={isAllShown}>
                {`${isAllShown ? 'Hide' : 'Show'}`} all ({images.length})
                <GlyphChevronDownIcon />
              </ToggleAll>
            </ToggleWrapper>
          )}
        </>
      ) : (
        <>
          {images.length > 0 && <GalleryTitle isVisible={isVisible}>{title}</GalleryTitle>}
          <ItemList
            isAllShown={isAllShown}
            // Sortable options (https://github.com/RubaXa/Sortable#options)
            options={actualOptions}
            onChange={(order, sortable, evt) => onDragEnd(order, evt)}
          >
            {images.length > 0 ? listItems : <PlaceholderText>{placeholder}</PlaceholderText>}
          </ItemList>

          {images.length > 10 && (
            <ToggleWrapper onClick={onShowAllClick}>
              <ToggleAll isAllShown={isAllShown}>
                {`${isAllShown ? 'Hide' : 'Show'}`} all ({images.length})
                <GlyphChevronDownIcon />
              </ToggleAll>
            </ToggleWrapper>
          )}
        </>
      )}
      {isVisible && <BottomLine />}
      {isOpen && (
        <Suspense fallback={<CarouselLoader />}>
          <ImageCarousel
            selectedItem={clickedItemIndex}
            images={imageURLs}
            open={isOpen}
            onClose={onClose}
          />
        </Suspense>
      )}
    </GalleryWrapper>
  )
}

export default DraggableGallery
