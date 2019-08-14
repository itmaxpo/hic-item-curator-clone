import React, { useState } from 'react'
import ImageCarousel from 'components/Carousel'

// Example of image URL's to send to DraggableGallery
const imagesURLS = [
  'https://loremflickr.com/1200/800/travel',
  'https://loremflickr.com/1200/800/travel',
  'https://loremflickr.com/1200/800/travel',
  'https://loremflickr.com/1200/800/travel',
  'https://loremflickr.com/1200/800/travel',
  'https://loremflickr.com/1200/800/travel',
  'https://loremflickr.com/1200/800/travel',
  'https://loremflickr.com/1200/800/travel',
  'https://loremflickr.com/1200/800/travel',
  'https://loremflickr.com/1200/800/travel',
  'https://loremflickr.com/1200/800/dance'
]

/**
 * This is an example of the Carousel components put together
 *
 * @name CarouselExample
 * @returns {Object} Carousel Example
 */
const CarouselExample = () => {
  const [open, setOpen] = useState(false)

  const onImageClick = item => {
    console.log(item)
  }

  const onClose = () => {
    setOpen(false)
  }

  const onOpen = () => {
    setOpen(true)
  }

  return (
    <>
      <ImageCarousel
        images={imagesURLS}
        open={open}
        onClose={onClose}
        onImageClick={onImageClick}
      />

      <button onClick={onOpen}>Show carousel</button>
    </>
  )
}

export default CarouselExample
