import React, { useState } from 'react'
import {
  Item,
  ImgWrapper,
  ProgressWrapper,
  ProgressBar,
  CoverImageBlock,
  ImgWrapperHoveredBlock,
  ItemWrapper
} from './styles'
import { Big } from '@tourlane/tourlane-ui'

/**
 * Components responsible for rendering particular image in DraggableGallery
 *
 * @param {Number} index
 * @param {Object} image
 * @param {Function} onItemViewClick
 * @param {Function} onItemSelected
 * @param {Boolean} isVisible - visible OR allGallery flag
 * @param {Boolean} disabled - is Editing mode is on/off
 */
const ItemPhoto = ({ index, image, onItemViewClick, onItemSelected, isVisible, disabled }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Item key={index} data-id={index}>
      {image.isLoading ? (
        <ProgressWrapper>
          <ProgressBar />
        </ProgressWrapper>
      ) : (
        <ItemWrapper
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {isHovered && (
            <ImgWrapperHoveredBlock>
              {disabled ? (
                <Big onClick={onItemViewClick}>View image</Big>
              ) : (
                <span></span>
                // {/* TODO: Uncomment this when delete button need to be enabled */}
                // <CheckboxWrapper
                //   defaultChecked={image.isSelected}
                //   onChange={e => onItemSelected(index)}
                // />
              )}
            </ImgWrapperHoveredBlock>
          )}
          <ImgWrapper
            isVisible={isVisible && index === 0}
            width={'100%'}
            src={image.value}
            alt={image.value}
          />
          {/* Need CopverImageBlack only for visible image gallery */}
          {isVisible && index === 0 && <CoverImageBlock>Cover image</CoverImageBlock>}
        </ItemWrapper>
      )}
    </Item>
  )
}

export default ItemPhoto
