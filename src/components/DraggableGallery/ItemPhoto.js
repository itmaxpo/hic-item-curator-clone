import React, { useState } from 'react'
import {
  Item,
  ImgWrapper,
  CoverImageBlock,
  ImgWrapperHoveredBlock,
  ItemWrapper,
  CheckboxWrapper,
  StyledBadge
} from './styles'
import { Big } from '@tourlane/tourlane-ui'
import LazyLoader from 'components/LazyLoader'

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
const ItemPhoto = ({
  index,
  image,
  onItemViewClick,
  onItemSelected,
  isVisible,
  disabled,
  badgeText
}) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Item key={image.id} data-id={index}>
      <ItemWrapper onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        {badgeText && <StyledBadge>{badgeText}</StyledBadge>}
        {isHovered && (
          <ImgWrapperHoveredBlock>
            {(disabled || !isVisible) && (
              <Big onClick={onItemViewClick}>View image</Big>
              // ) : (
              // Ability to remove images from items is disabled
              // <CheckboxWrapper
              //   defaultChecked={image.isSelected}
              //   onChange={e => onItemSelected(index)}
              // />
            )}
          </ImgWrapperHoveredBlock>
        )}

        <LazyLoader src={image.value} height={'110px'} isLoading={image.isLoading}>
          <ImgWrapper
            isVisible={isVisible && index === 0}
            width={'100%'}
            src={image.value}
            alt={image.value}
          />
        </LazyLoader>

        {/* If item.isSelected show checkBox */}
        {image.isSelected && (
          <CheckboxWrapper
            defaultChecked={image.isSelected}
            onChange={e => onItemSelected(index)}
          />
        )}

        {/* Need CopverImageBlack only for visible image gallery */}
        {isVisible && index === 0 && <CoverImageBlock>Cover image</CoverImageBlock>}
      </ItemWrapper>
    </Item>
  )
}

export default ItemPhoto
