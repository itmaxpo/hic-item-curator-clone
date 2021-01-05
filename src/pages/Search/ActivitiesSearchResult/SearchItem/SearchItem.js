import * as React from 'react'
import ReactHtmlParser from 'react-html-parser'
import LazyLoad from 'react-lazyload'
import { Chip, FlexContainer, P } from '@tourlane/tourlane-ui'

import ShowMore from 'components/ShowMore'

import { scrollToItemManager } from 'utils/ScrollToItemManager'
import ItemBadge from '../../../../components/ItemBadge'
import { Preloader } from '../../../../components/LazyLoader'
import { getItemAttachmentsById } from '../../../../services/contentApi'
import { usePromise } from '../../../../utils/usePromise'
import {
  BadgeWrapperPhoto,
  StyledResizedImage,
  StyledUnhappyIcon
} from '../../SearchResult/SearchItem/styles'
import { getCoverImage } from '../../SearchResult/SearchItem/utils'
import { addSToString } from '../../utils'
import {
  ItemDescription,
  ItemSubtitle,
  ItemTitle,
  ItemTitleWrapper,
  SearchItemContentContainer,
  SearchItemInfoWrapper,
  SearchItemPhotosWrapper,
  SearchItemWrapper,
  UnstyledLink
} from './styles'

const Image = ({ itemId }) => {
  let { isLoading, data: images = [], error } = usePromise(async () => {
    let { data: images } = await getItemAttachmentsById(itemId)

    return images
  }, [itemId])

  if (isLoading) return <Preloader />

  if (error || images.length === 0) {
    return <StyledUnhappyIcon />
  }

  return (
    <>
      <StyledResizedImage src={getCoverImage(images).s3_key} height="170" width="280" />

      <BadgeWrapperPhoto data-test="photo">
        <ItemBadge width={'95px'}>
          <P>
            {images.length} Photo{addSToString(images.length)}
          </P>
        </ItemBadge>
      </BadgeWrapperPhoto>
    </>
  )
}

export const SearchItem = ({ item, onClick }) => (
  <SearchItemWrapper
    id={item.uuid}
    data-test="search-item"
    p={3 / 4}
    direction={'ltr'}
    isMerged={item.isMerged}
  >
    <SearchItemContentContainer onClick={e => onClick(e, item)}>
      <SearchItemInfoWrapper p={0} direction="ttb">
        {/* TODO: Uncomment when status should be rendered */}
        {/* <BadgeWrapper>
              <ItemBadge width={'139px'}>
                <StatusIndicator status={item.status} />
              </ItemBadge>
            </BadgeWrapper> */}
        <ItemTitleWrapper justify="between">
          <UnstyledLink
            onClick={e => {
              // stopping propagation to avoid JS clicking in parent which will open the link in current tab
              e.stopPropagation()
              scrollToItemManager.setItemToScrollTo(item.uuid)
            }}
            to={`/activity/${item.uuid}?language=en-GB`}
          >
            <ItemTitle data-test="title">
              <span>{item.name}</span>
            </ItemTitle>
          </UnstyledLink>
        </ItemTitleWrapper>
        <ItemSubtitle data-test="subtitle">{item?.country?.name}</ItemSubtitle>
        <FlexContainer mb={0.5} p={0}>
          <FlexContainer p={0} mr={0.5}>
            <Chip data-test="provider">Provider: {item.provider}</Chip>
          </FlexContainer>
          <FlexContainer p={0}>
            <Chip data-test="supplier">Supplier: {item.supplier_id}</Chip>
          </FlexContainer>
        </FlexContainer>
        <ItemDescription data-test="description">
          <ShowMore collapsed={true} height={'60px'} size={'18px'}>
            {ReactHtmlParser(item.description)}
          </ShowMore>
        </ItemDescription>
      </SearchItemInfoWrapper>

      <LazyLoad once>
        <SearchItemPhotosWrapper>
          <Image itemId={item.uuid} />
        </SearchItemPhotosWrapper>
      </LazyLoad>
    </SearchItemContentContainer>
  </SearchItemWrapper>
)

export default SearchItem
