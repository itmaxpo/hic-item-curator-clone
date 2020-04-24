import React, { useState, useEffect, useCallback } from 'react'
import ReactHtmlParser from 'react-html-parser'
import { isEmpty, map } from 'lodash'
import ShowMore from 'components/ShowMore'
import ItemBadge from 'components/ItemBadge'
import { addSToString } from 'pages/Search/utils'
import {
  SearchItemWrapper,
  SearchItemCheckbox,
  SearchItemContentContainer,
  SearchItemInfoWrapper,
  ItemTitleWrapper,
  ItemTitle,
  ItemSubtitle,
  ItemDescription,
  // BadgeWrapper,
  BadgeWrapperPhoto,
  SearchItemPhotosWrapper,
  StyledResizedImage,
  StyledUnhappyIcon
} from './styles'
import { P, FlexContainer } from '@tourlane/tourlane-ui'
import { Preloader } from 'components/LazyLoader'
import { enrichItem, getCoverImage } from './utils'
import BlacklistedMarketsChip from 'pages/Item/ItemLayout/Blacklisting/BlacklistedMarketsChip'

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
    let newSubtitle

    if (country) newSubtitle = country
    if (areaName) newSubtitle = areaName
    if (country && areaName) newSubtitle = `${areaName}, ${country}`

    if (newSubtitle) setSubtitle(newSubtitle)
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
      const coverImage = getCoverImage(localItem.allImages)

      return (
        <StyledResizedImage
          src={coverImage.s3_key}
          alt={coverImage.s3_key}
          height="170"
          width="280"
        />
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localItem.allImages])

  return (
    <SearchItemWrapper
      id={localItem.id}
      data-test="search-item"
      p={3 / 4}
      direction={'ltr'}
      isMerged={localItem.isMerged}
    >
      <FlexContainer p={0} alignItems={'start'} data-test="checkbox">
        <SearchItemCheckbox
          name="isItemSelected"
          checked={map(selectedItems, 'id').includes(localItem.id)}
          onChange={onCheckboxChange}
        />
      </FlexContainer>

      <SearchItemContentContainer onClick={e => onItemClick(e, localItem)}>
        <SearchItemInfoWrapper p={0} direction="ttb">
          {/* TODO: Uncomment when status should be rendered */}
          {/* <BadgeWrapper>
              <ItemBadge width={'139px'}>
                <StatusIndicator status={localItem.status} />
              </ItemBadge>
            </BadgeWrapper> */}
          <ItemTitleWrapper justify="between">
            <ItemTitle data-test="title">
              <span>{localItem.title}</span>
            </ItemTitle>
            {item?.blacklisted?.markets && (
              <BlacklistedMarketsChip alignItems="center" markets={item.blacklisted.markets} />
            )}
          </ItemTitleWrapper>
          <ItemSubtitle data-test="subtitle">{subtitle}</ItemSubtitle>
          <ItemDescription data-test="description">
            <ShowMore collapsed={true} height={'60px'} size={'18px'}>
              {ReactHtmlParser(localItem.description)}
            </ShowMore>
          </ItemDescription>
        </SearchItemInfoWrapper>
        <SearchItemPhotosWrapper p={0} isEmpty={isEmpty}>
          <Image />
          <BadgeWrapperPhoto data-test="photo">
            <ItemBadge width={'95px'}>
              <P>
                {localItem.allImages.length} Photo{addSToString(localItem.allImages.length)}
              </P>
            </ItemBadge>
          </BadgeWrapperPhoto>
        </SearchItemPhotosWrapper>
      </SearchItemContentContainer>
    </SearchItemWrapper>
  )
}

export default SearchItem
