import React, { useState, useEffect, Fragment } from 'react'
import ReactHtmlParser from 'react-html-parser'
import { isEmpty } from 'lodash'
import Skeleton from '@material-ui/lab/Skeleton'
import ShowMore from 'components/ShowMore'
import ItemBadge from 'components/ItemBadge'
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
import { P, FlexContainer } from '@tourlane/tourlane-ui'
import LazyLoader, { Preloader } from 'components/LazyLoader'
import { enrichItem } from './utils'
import { ACCOMMODATION_ITEM_TYPE } from 'pages/ItemPage/itemParser'

/**
 * This component is rendering item with ability to select/deselect
 * and showing more description or not
 *
 * @param {Object} item
 * @param {Number} index
 * @param {Function} onSelect
 * @param {Array<String>} allSelectedIds
 * @param {Function} onItemClick
 */
export const SearchItem = ({
  item,
  index,
  onItemSelect,
  onItemClick,
  updateItemRef,
  allSelectedIds
}) => {
  const [localItem, setLocalItem] = useState(item)

  const onCheckboxChange = () => {
    const selectedItem = { ...localItem, isSelected: !localItem.isSelected }
    onItemSelect(selectedItem, index)
  }

  useEffect(() => {
    setLocalItem(item)
  }, [item])

  useEffect(() => {
    // Enrich item and update it's ref in parent
    // so we don't enrich the same item twice.
    async function getEnrichedItem() {
      if (localItem.isLoading && localItem) {
        const enrichedItem = await enrichItem(localItem)
        updateItemRef(enrichedItem)
        setLocalItem(enrichedItem)
      }
    }

    getEnrichedItem()
  }, [localItem, updateItemRef])

  const noPictures = localItem.isLoading === false && isEmpty(localItem.photos)

  const Image = () => {
    if (localItem.isLoading) return <Preloader />

    if (noPictures) {
      return <StyledUnhappyIcon />
    } else {
      return (
        <LazyLoader src={localItem.photos[0].url}>
          <ImgWrapper width={'100%'} src={localItem.photos[0].url} alt={localItem.photos[0].url} />
        </LazyLoader>
      )
    }
  }

  return (
    <SearchItemWrapper p={3 / 4} direction={'ltr'}>
      <FlexContainer p={0} alignItems={'start'}>
        <SearchItemCheckbox
          id={index}
          className={'search-item-checkbox'}
          name="isItemSelected"
          checked={allSelectedIds.includes(localItem.id)}
          onChange={onCheckboxChange}
        />
      </FlexContainer>

      <SearchItemBodyWrapper p={0} direction={'ttb'} onClick={e => onItemClick(e, localItem)}>
        {/* TODO: Uncomment when status should be rendered */}
        {/* <BadgeWrapper>
          <ItemBadge width={'139px'}>
            <StatusIndicator status={localItem.status} />
          </ItemBadge>
        </BadgeWrapper> */}
        <ItemTitle>
          <span>{localItem.title}</span>
        </ItemTitle>
        <ItemSubtitle>{localItem.subtitle}</ItemSubtitle>
        <ItemDescription>
          {/* At the moment, only accommodations have description */}
          {localItem.isLoading && localItem.type === ACCOMMODATION_ITEM_TYPE ? (
            <Fragment>
              <Skeleton />
              <Skeleton width="60%" />
            </Fragment>
          ) : (
            <ShowMore collapsed={true} height={'60px'} size={'18px'}>
              {ReactHtmlParser(localItem.description)}
            </ShowMore>
          )}
        </ItemDescription>
      </SearchItemBodyWrapper>

      <SearchItemPhotosWrapper p={0} isEmpty={isEmpty}>
        <Image />
        <BadgeWrapperPhoto>
          <ItemBadge width={'95px'}>
            <P>
              {localItem.photos.length} Photo{addSToString(localItem.photos.length)}
            </P>
          </ItemBadge>
        </BadgeWrapperPhoto>
      </SearchItemPhotosWrapper>
    </SearchItemWrapper>
  )
}

export default SearchItem
