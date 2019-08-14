import React from 'react'
import ShowMore from 'components/ShowMore'
import ItemBadge from 'components/ItemBadge'
// import StatusIndicator from 'components/StatusIndicator'
import { addSToString } from 'pages/Search/utils'
import {
  SearchItemWrapper,
  SearchItemCheckbox,
  SearchItemBodyWrapper,
  ItemTitle,
  ItemSubtitle,
  ItemDescription,
  // BadgeWrapper,
  BadgeWrapperPhoto,
  SearchItemPhotosWrapper,
  ImgWrapper,
  StyledUnhappyIcon
} from './styles'

/**
 * This component is rendering item with ability to select/deselect
 * and showing more description or not
 *
 * @param {Object} item
 * @param {Number} index
 * @param {Function} onSelect
 * @param {Function} onItemClick
 */
export const SearchItem = ({ item, index, onItemSelect, onItemClick }) => {
  const isEmpty = item.photos.length === 0
  const url = 'https://loremflickr.com/320/240/travel'

  const onCheckboxChange = () => {
    const selectedItem = { ...item, isSelected: !item.isSelected }
    onItemSelect(selectedItem, index)
  }

  return (
    <SearchItemWrapper p={3 / 4} direction={'ltr'}>
      <SearchItemCheckbox
        id={index}
        className={'search-item-checkbox'}
        name="isItemSelected"
        checked={item.isSelected}
        onChange={onCheckboxChange}
      />

      <SearchItemBodyWrapper p={0} direction={'ttb'} onClick={e => onItemClick(e, item)}>
        {/* TODO: Uncomment when status should be rendered */}
        {/* <BadgeWrapper>
          <ItemBadge width={'139px'}>
            <StatusIndicator status={item.status} />
          </ItemBadge>
        </BadgeWrapper> */}
        <ItemTitle>
          <span>{item.title}</span>
        </ItemTitle>
        <ItemSubtitle>{item.subtitle}</ItemSubtitle>
        <ItemDescription>
          {item.description && (
            <ShowMore collapsed={true} height={'60px'} size={'18px'}>
              {item.description}
            </ShowMore>
          )}
        </ItemDescription>
      </SearchItemBodyWrapper>

      <SearchItemPhotosWrapper p={0} isEmpty={isEmpty}>
        {!isEmpty ? <ImgWrapper width={'100%'} src={url} alt={url} /> : <StyledUnhappyIcon />}

        <BadgeWrapperPhoto>
          <ItemBadge width={'95px'}>
            {item.photos.length} Photo{addSToString(item.photos.length)}
          </ItemBadge>
        </BadgeWrapperPhoto>
      </SearchItemPhotosWrapper>
    </SearchItemWrapper>
  )
}

export default SearchItem
