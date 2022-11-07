import LazyLoad from 'react-lazyload'
import parse from 'html-react-parser'

import { Chip, P, Flex } from '@tourlane/tourlane-ui'

import ShowMore from 'components/ShowMore'
import { scrollToItemManager } from 'utils/ScrollToItemManager'
import ItemBadge from '../../../../components/ItemBadge'
import { Preloader } from '../../../../components/LazyLoader'
import { getItemAttachments } from '../../../../services/attachmentsApi'
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
  let [{ isLoading, data: images = [], error }] = usePromise(
    () => getItemAttachments({ itemId, itemType: 'activity' }),
    [itemId]
  )

  if (isLoading) return <Preloader />

  const visibleImages = images.filter(({ tags }) => tags?.visible !== false)

  if (error || visibleImages.length === 0) {
    return <StyledUnhappyIcon />
  }

  return (
    <>
      <StyledResizedImage src={getCoverImage(images).s3_key} height="170" width="280" />

      <BadgeWrapperPhoto data-test="photo">
        <ItemBadge width={'95px'}>
          <P>
            {visibleImages.length} Photo{addSToString(visibleImages.length)}
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
    <SearchItemContentContainer onClick={(e) => onClick(e, item)}>
      <SearchItemInfoWrapper p={0} direction="ttb">
        <ItemTitleWrapper justify="between">
          <UnstyledLink
            onClick={(e) => {
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
        <Flex gap={16} mb={16}>
          {item.provider && <Chip data-test="provider">Provider: {item.provider}</Chip>}
          <Chip data-test="supplier">Supplier: {item.supplier_id}</Chip>
        </Flex>

        <ItemDescription data-test="description">
          <ShowMore collapsed={true} height={'60px'} size={'18px'}>
            {parse(item.description ?? '')}
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
