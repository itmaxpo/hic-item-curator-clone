import React from 'react'
import {
  SearchItemBodyWrapper,
  ItemTitle,
  ItemSubtitle,
  ItemDescription
  // BadgeWrapper
} from './styles'
import ShowMore from 'components/ShowMore'
// import ItemBadge from 'components/ItemBadge'
// import StatusIndicator from 'components/StatusIndicator'

/**
 * This component is rendering item body with all neccessary information except photos
 *
 * @param {Object} item
 */
export const SearchItemBody = ({ item, onItemClick }) => {
  const onItemClickHandler = () => {
    onItemClick(item)
  }

  return (
    <SearchItemBodyWrapper p={0} direction={'ttb'}>
      {/* <BadgeWrapper>
        <ItemBadge width={'139px'}>
          <StatusIndicator status={item.status} />
        </ItemBadge>
      </BadgeWrapper> */}
      <ItemTitle>
        <span onClick={onItemClickHandler}>{item.title}</span>
      </ItemTitle>
      <ItemSubtitle>{item.subtitle}</ItemSubtitle>
      <ItemDescription>
        {item.description && (
          <ShowMore collapsed={true} height={'60px'}>
            {item.description}
          </ShowMore>
        )}
      </ItemDescription>
    </SearchItemBodyWrapper>
  )
}

export default SearchItemBody
