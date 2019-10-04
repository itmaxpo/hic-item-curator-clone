import React, { useState, useEffect, useCallback } from 'react'
import ReactHtmlParser from 'react-html-parser'
import { isEmpty, map } from 'lodash'
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

/**
 * This component is rendering item with ability to select/deselect
 * and showing more description or not
 *
 * @param {Object} item
 * @param {Number} index
 * @param {Function} onSelect
 * @param {Array<String>} selectedItems
 * @param {Function} onItemClick
 */
export const SearchItem = ({
  item,
  index,
  onItemSelect,
  onItemClick,
  updateItemRef,
  selectedItems,
  areaName,
  country
}) => {
  const [localItem, setLocalItem] = useState(item)
  // Subtitle needs to be a separated state because for accommodations we have to
  // fetch the item's parent fields to get the area name.
  const [subtitle, setSubtitle] = useState(country)

  const [isLoading, setIsLoading] = useState(item.isLoading)

  const onCheckboxChange = () => {
    const selectedItem = { ...localItem, isSelected: !localItem.isSelected }
    onItemSelect(selectedItem, index)
  }

  useEffect(() => {
    setLocalItem(item)
  }, [item])

  useEffect(() => {
    if (areaName) {
      setSubtitle(`${areaName}, ${country}`)
    }
  }, [areaName, country, setSubtitle])

  useEffect(() => {
    // Enrich item and update it's ref in parent
    // so we don't enrich the same item twice.
    async function getEnrichedItem() {
      if (isLoading) {
        setIsLoading(false)
        const enrichedItem = await enrichItem(localItem)
        updateItemRef(enrichedItem, localItem.isMerged)
        setLocalItem(enrichedItem)
      }
    }

    getEnrichedItem()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localItem, updateItemRef])

  const Image = useCallback(() => {
    const noPictures = isLoading === false && isEmpty(localItem.allImages)

    if (isLoading) return <Preloader />

    if (noPictures) {
      return <StyledUnhappyIcon />
    } else {
      return (
        <LazyLoader src={localItem.allImages[0].url}>
          <ImgWrapper
            width={'100%'}
            src={localItem.allImages[0].url}
            alt={localItem.allImages[0].url}
          />
        </LazyLoader>
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localItem.allImages])

  return (
    <SearchItemWrapper p={3 / 4} direction={'ltr'} isMerged={localItem.isMerged}>
      <FlexContainer p={0} alignItems={'start'}>
        <SearchItemCheckbox
          id={index}
          className={'search-item-checkbox'}
          name="isItemSelected"
          checked={map(selectedItems, 'id').includes(localItem.id)}
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
        <ItemSubtitle>{subtitle}</ItemSubtitle>
        <ItemDescription>
          <ShowMore collapsed={true} height={'60px'} size={'18px'}>
            {ReactHtmlParser(localItem.description)}
          </ShowMore>
        </ItemDescription>
      </SearchItemBodyWrapper>

      <SearchItemPhotosWrapper p={0} isEmpty={isEmpty}>
        <Image />
        <BadgeWrapperPhoto>
          <ItemBadge width={'95px'}>
            <P>
              {localItem.allImages.length} Photo{addSToString(localItem.allImages.length)}
            </P>
          </ItemBadge>
        </BadgeWrapperPhoto>
      </SearchItemPhotosWrapper>
    </SearchItemWrapper>
  )
}

export default SearchItem
