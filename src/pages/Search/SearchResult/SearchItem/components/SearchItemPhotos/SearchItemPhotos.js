import React from 'react'
import { SearchItemPhotosWrapper, BadgeWrapper, ImgWrapper } from './styles'
import ItemBadge from 'components/ItemBadge'
import { addSToString } from 'pages/Search/utils'

/**
 * This component is rendering item body with all neccessary information
 * except photos
 *
 * @param {Array<File>} photos
 */
export const SearchItemPhotos = ({ photos }) => {
  const isEmpty = photos.length === 0

  return (
    <SearchItemPhotosWrapper p={0} isEmpty={isEmpty}>
      {!isEmpty && <ImgWrapper width={'100%'} src={'https://loremflickr.com/320/240/travel'} />}

      <BadgeWrapper>
        <ItemBadge width={'95px'}>
          {photos.length} Photo{addSToString(photos.length)}
        </ItemBadge>
      </BadgeWrapper>
    </SearchItemPhotosWrapper>
  )
}

export default SearchItemPhotos
