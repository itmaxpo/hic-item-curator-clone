import React from 'react'
import { Carousel } from 'react-responsive-carousel'
import './carousel.css'
import Dialog from '@material-ui/core/Dialog'
import { CarouselWrapper, CancelButton } from './styles'
import { CloseIcon } from 'components/Icon'

/**
 * This is component that show Image Gallery in View mode
 *
 * @param {Boolean} open - handle open state for Carousel
 * @param {Array<String>} images - Array of image URL's to show as a String's
 * @param {Function} onClose
 * @param {Function} onImageClick
 */
const ImageCarousel = ({ open, images = [], onClose, onImageClick, selectedItem = 0 }) => {
  // For creating Legends: <p className="legend">Legend 1</p>

  return (
    <Dialog
      onClose={onClose}
      aria-labelledby="simple-dialog-title"
      open={open}
      PaperProps={{
        style: {
          backgroundColor: 'transparent',
          boxShadow: 'none',
          maxWidth: '75%'
        }
      }}
    >
      <CarouselWrapper>
        <CancelButton onClick={onClose}>
          <CloseIcon />
        </CancelButton>

        {/* Options: http://react-responsive-carousel.js.org/storybook/?selectedKind=Carousel&selectedStory=no%20indicators&full=0&down=1&left=1&panelRight=0&downPanel=kadirahq%2Fstorybook-addon-actions%2Factions-panel  */}
        <Carousel
          showArrows={true}
          autoPlay
          interval={4000}
          infiniteLoop
          useKeyboardArrows
          selectedItem={selectedItem}
          showIndicators={false}
        >
          {images.map((image, i) => (
            <div key={i}>
              <img
                style={{ maxWidth: 1200, maxHeight: 693, objectFit: 'contain' }}
                onClick={() => onImageClick(image)}
                src={image}
                alt={image}
              />
            </div>
          ))}
        </Carousel>
      </CarouselWrapper>
    </Dialog>
  )
}

export default ImageCarousel
