import React, { useState, useEffect } from 'react'
import ReactHtmlParser from 'react-html-parser'
import { isEmpty } from 'lodash'
import ShowMore from 'components/ShowMore'
// import ItemBadge from 'components/ItemBadge'
// import { addSToString } from 'pages/Search/utils'
import {
  SearchItemWrapper,
  SearchItemContentContainer,
  SearchItemInfoWrapper,
  ItemTitleWrapper,
  ItemTitle,
  ItemSubtitle,
  ItemDescription,
  SearchItemPhotosWrapper,
  UnstyledLink
} from './styles'
import { FlexContainer, Chip } from '@tourlane/tourlane-ui'
// import { Preloader } from 'components/LazyLoader'
import { enrichItem } from './utils'
import { scrollToItemManager } from 'utils/ScrollToItemManager'

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
export const SearchItem = ({ item, onItemClick, updateItemRef }) => {
  const [localItem, setLocalItem] = useState(item)
  const [isLoading, setIsLoading] = useState(item.isLoading)

  useEffect(() => {
    setLocalItem(item)
  }, [item])

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

  // const Image = useCallback(() => {
  //   const noPictures = isLoading === false && isEmpty(localItem.allImages)

  //   if (isLoading) return <Preloader />

  //   if (noPictures) {
  //     return <StyledUnhappyIcon />
  //   } else {
  //     const coverImage = getCoverImage(localItem.allImages)

  //     return (
  //       <StyledResizedImage
  //         src={coverImage.s3_key}
  //         alt={coverImage.s3_key}
  //         height="170"
  //         width="280"
  //       />
  //     )
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [localItem.allImages])

  return (
    <SearchItemWrapper
      id={localItem.id}
      data-test="search-item"
      p={3 / 4}
      direction={'ltr'}
      isMerged={localItem.isMerged}
    >
      <SearchItemContentContainer onClick={e => onItemClick(e, localItem)}>
        <SearchItemInfoWrapper p={0} direction="ttb">
          {/* TODO: Uncomment when status should be rendered */}
          {/* <BadgeWrapper>
              <ItemBadge width={'139px'}>
                <StatusIndicator status={localItem.status} />
              </ItemBadge>
            </BadgeWrapper> */}
          <ItemTitleWrapper justify="between">
            <UnstyledLink
              onClick={e => {
                // stopping propagation to avoid JS clicking in parent which will open the link in current tab
                e.stopPropagation()
                scrollToItemManager.setItemToScrollTo(localItem.id)
              }}
              to={`/item/${localItem.id}?language=en-GB`}
            >
              <ItemTitle data-test="title">
                <span>{localItem.name}</span>
              </ItemTitle>
            </UnstyledLink>
          </ItemTitleWrapper>
          <ItemSubtitle data-test="subtitle">{localItem?.country?.name}</ItemSubtitle>
          <FlexContainer mb={0.5} p={0}>
            <FlexContainer p={0} mr={0.5}>
              <Chip data-test="provider">Provider: {localItem.provider}</Chip>
            </FlexContainer>
            <FlexContainer p={0}>
              <Chip data-test="supplier">Supplier: {localItem.supplier_id}</Chip>
            </FlexContainer>
          </FlexContainer>
          <ItemDescription data-test="description">
            <ShowMore collapsed={true} height={'60px'} size={'18px'}>
              {ReactHtmlParser(localItem.description)}
            </ShowMore>
          </ItemDescription>
        </SearchItemInfoWrapper>
        <SearchItemPhotosWrapper p={0} isEmpty={isEmpty}>
          {/* This should be renabled and used when images are addressed */}
          {/* <Image />
          <BadgeWrapperPhoto data-test="photo">
            <ItemBadge width={'95px'}>
              <P>
                {localItem.allImages.length} Photo{addSToString(localItem.allImages.length)}
              </P>
            </ItemBadge>
          </BadgeWrapperPhoto> */}
        </SearchItemPhotosWrapper>
      </SearchItemContentContainer>
    </SearchItemWrapper>
  )
}

export default SearchItem
