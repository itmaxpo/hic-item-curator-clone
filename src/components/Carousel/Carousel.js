import React from 'react'
import { Card, CircleIconButton, COLORS } from '@tourlane/tourlane-ui'
import { StyledDialog, StyledCloseContainer, ImgWrapper, StyledImagesCarousel } from './styles'

/**
 * This is component that show Image Gallery in View mode
 *
 * @param {Boolean} open - handle open state for Carousel
 * @param {Array<String>} images - Array of image URL's to show as a String's
 * @param {Function} onClose
 * @param {Function} onImageClick
 */
const ImageCarousel = ({ open, images = [], onClose, selectedItem = 0 }) => {
  return (
    <StyledDialog
      onClose={onClose}
      aria-labelledby="simple-dialog-title"
      open={open}
      PaperProps={{
        style: {
          backgroundColor: 'transparent',
          boxShadow: 'none',
          maxWidth: 900,
          margin: '0'
        }
      }}
    >
      <Card>
        <StyledImagesCarousel showChevronsOnHover itemIndex={selectedItem}>
          {images.map((image) => (
            <ImgWrapper
              key={image.s3_key}
              width={'900'}
              height={'600'}
              fit={'fill'}
              src={image.s3_key}
              alt={image.s3_key}
            />
          ))}
        </StyledImagesCarousel>
        <StyledCloseContainer>
          <CircleIconButton iconColor={COLORS.NIGHTINGALE_BLACK} hasClose onClick={onClose} />
        </StyledCloseContainer>
      </Card>
    </StyledDialog>
  )
}

export default ImageCarousel
