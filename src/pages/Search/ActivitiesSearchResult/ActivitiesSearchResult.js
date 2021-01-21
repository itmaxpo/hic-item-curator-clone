import { useEffect, useRef, useState } from 'react'
import { withRouter } from 'react-router-dom'
import flatten from 'lodash/flatten'

import { ExtraSmall, FlexContainer, H4 } from '@tourlane/tourlane-ui'

import Pagination from 'components/Pagination'
import { ITEMS_PER_PAGE, ACTIVITY_ITEM_TYPE } from 'utils/constants'
import { scrollToItemManager } from 'utils/ScrollToItemManager'
import SearchItem from './SearchItem'
import {
  BottomWrapper,
  PaginationCenteredWrapper,
  SearchResultContainer,
  TotalItemsWrapper
} from './styles'
import { missingId, paginateResults, scrollToActions } from './utils'
import { calculateIndex, insertPage } from '../utils'
import { getActivities } from 'services/searchApi'
import { NoResults } from '../Search'

export const ActivitiesSearchResult = withRouter(
  ({ history, locationQuery, onQueryUpdate, setIsLoading, isLoading }) => {
    const {
      areaId,
      countryId,
      name,
      supplier,
      provider,
      missingGeolocation,
      blocked
    } = locationQuery
    const searchContainer = useRef(null)
    const [currentPage, setCurrentPage] = useState(Number(locationQuery.page) || 1)
    const [activities, setActivities] = useState([])

    // Find diff between activities & results
    const paginatedResults = paginateResults(activities, ITEMS_PER_PAGE)

    const searchActivities = async (page) => {
      setIsLoading(true)
      const index = calculateIndex(page ? page - 1 : currentPage - 1, ITEMS_PER_PAGE)

      const { data, meta } = await getActivities(
        {
          country: countryId,
          area: areaId,
          name,
          supplier,
          provider,
          missingGeolocation: missingGeolocation === 'true',
          blocked: blocked === 'true'
        },
        index
      )

      setActivities(flatten(insertPage(null, index, data, meta.total_count, ACTIVITY_ITEM_TYPE)))
      setIsLoading(false)
    }

    const onPageChange = async (page) => {
      onQueryUpdate({ ...locationQuery, page })
      // Calculate offsetTop for searchContainer to scroll to it
      scrollToActions(searchContainer)

      setCurrentPage(page)
      // check if page is empty
      if (paginatedResults[page - 1].some(missingId)) {
        try {
          await searchActivities(page)
        } catch (e) {
          console.warn(e)
        }
      }
    }

    const onItemClick = (e, activity) => {
      // Prevent clicking event before item loaded || 'show more' clicked
      if (activity.isLoading || e.target.nodeName === 'BUTTON') {
        e.preventDefault()
      } else {
        scrollToItemManager.setItemToScrollTo(activity.uuid)
        history.push(`/activity/${activity.uuid}?language=en-GB`)
      }
    }

    // effect to run after the user comes back from the item page
    useEffect(() => {
      searchActivities().then()

      setTimeout(() => {
        scrollToItemManager.scrollToItem()
      }, 500)
      // eslint-disable-next-line
    }, [countryId, supplier, name, provider])

    return (
      <FlexContainer data-test="searchResult" p={0} direction="ttb" id={'search-container'}>
        {paginatedResults.length === 0 ? (
          !isLoading && <NoResults />
        ) : (
          <SearchResultContainer data-test="page">
            <FlexContainer px={0} py={1}>
              <H4>All Activities</H4>
            </FlexContainer>

            {paginatedResults[currentPage - 1]
              .filter(({ uuid }) => uuid)
              .map((item) => (
                <SearchItem key={item.uuid} item={item} onClick={onItemClick} />
              ))}

            {/* Rendering part after all results has been shown */}
            <BottomWrapper p={3 / 4} alignItems={'center'}>
              {paginatedResults.length > 1 ? (
                <PaginationCenteredWrapper>
                  <Pagination
                    total={paginatedResults.length * ITEMS_PER_PAGE}
                    limit={ITEMS_PER_PAGE}
                    currentPage={currentPage}
                    onPageChange={onPageChange}
                  />

                  <TotalItemsWrapper p={0} alignItems={'center'} direction={'ltr'}>
                    <ExtraSmall>
                      <span>Total pages: </span>
                      {paginatedResults.length}
                    </ExtraSmall>
                    <ExtraSmall>
                      <span>Total items: </span>
                      {activities.length}
                    </ExtraSmall>
                  </TotalItemsWrapper>
                </PaginationCenteredWrapper>
              ) : (
                <PaginationCenteredWrapper />
              )}
            </BottomWrapper>
          </SearchResultContainer>
        )}
      </FlexContainer>
    )
  }
)

export default ActivitiesSearchResult
