import * as React from 'react'
import { useEffect, useRef, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { ExtraSmall, FlexContainer, H4 } from '@tourlane/tourlane-ui'

import Pagination from 'components/Pagination'
import { ITEMS_PER_PAGE } from 'utils/constants'
import { scrollToItemManager } from 'utils/ScrollToItemManager'
import SearchItem from './SearchItem'
import {
  BottomWrapper,
  PaginationCenteredWrapper,
  SearchResultContainer,
  TotalItemsWrapper
} from './styles'
import { missingId, paginateResults, scrollToActions } from './utils'

/**
 * This is component, that is responsible for rendering all search results
 * Will receive Array<SearchResult> and transform it to Array<Array<SearchResult>>
 * for pagination feature
 * Wrapped in withRouter HOC to have access to <history>
 *
 *
 * @name SearchResult
 * @param {Object} history from react-router
 * @param {Array} results (results from search)
 * @param {Function} setResults - callback to update results from search - used to enrich items
 * @param {Function} fetchMoreItems - fetch missing items, as we only fetch chunks of 40 items
 * @param {Object} locationQuery - query url
 * @param {Function} onQueryUpdate - callback to update query url
 * @param {Object} history from react-router
 * @returns {Function} Search Result component
 */
export const ActivitiesSearchResult = withRouter(
  ({ history, results, fetchMoreItems, locationQuery, onQueryUpdate, page }) => {
    const searchContainer = useRef(null)
    const [currentPage, setCurrentPage] = useState(page || 1)
    const paginatedResults = paginateResults(results, ITEMS_PER_PAGE)

    const onPageChange = async page => {
      onQueryUpdate({ ...locationQuery, page })

      // Calculate offsetTop for searchContainer to scroll to it
      scrollToActions(searchContainer)

      // check if page is empty
      if (paginatedResults[page - 1].some(missingId)) {
        try {
          // fetch more items, then we set the current page.
          await fetchMoreItems(null, page - 1)
          setCurrentPage(page)
        } catch (e) {
          console.warn(e)
        }
      } else {
        setCurrentPage(page)
      }
    }

    const onItemClick = (e, activity) => {
      // Prevent clicking event before item loaded || 'show more' clicked
      if (activity.isLoading || e.target.nodeName === 'BUTTON') {
        e.preventDefault()
      } else {
        scrollToItemManager.setItemToScrollTo(activity.uuid)
        history.push(`/activities/${activity.uuid}?language=en-GB`)
      }
    }

    // effect to run after the user comes back from the item page
    useEffect(() => {
      setTimeout(() => {
        scrollToItemManager.scrollToItem()
      }, 500)
    }, [])

    return (
      <FlexContainer data-test="searchResult" p={0} direction="ttb" id={'search-container'}>
        {paginatedResults.length === 0 ? (
          <FlexContainer>No results</FlexContainer>
        ) : (
          <SearchResultContainer data-test="page">
            <FlexContainer px={0} py={1}>
              <H4>All Activities</H4>
            </FlexContainer>
            {paginatedResults[currentPage - 1].map(item => (
              <SearchItem key={item.uuid} item={item} onItemClick={onItemClick} />
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
                      {results.length}
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
