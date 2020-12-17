import React, { useState, useRef, useEffect, useCallback } from 'react'
import { isEmpty, flatten } from 'lodash'
import { withRouter } from 'react-router-dom'
import { FlexContainer, ExtraSmall, H4 } from '@tourlane/tourlane-ui'
import Pagination from 'components/Pagination'
import { paginateResults, scrollToActions, missingId, enrichItems } from './utils'
import SearchItem from './SearchItem'
import {
  SearchResultContainer,
  PaginationCenteredWrapper,
  BottomWrapper,
  TotalItemsWrapper
} from './styles'
import { ITEMS_PER_PAGE } from 'utils/constants'
import { scrollToItemManager } from 'utils/ScrollToItemManager'

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
  ({ history, results, setResults, fetchMoreItems, locationQuery, onQueryUpdate, page }) => {
    const searchContainer = useRef(null)
    const [currentPage, setCurrentPage] = useState(page || 1)
    const [allResults, setAllResults] = useState(paginateResults(results, ITEMS_PER_PAGE))
    const enrichedItemsRef = useRef([])

    const updateItemRef = useCallback(updatedItem => {
      enrichedItemsRef.current.push(updatedItem)
    }, [])

    /* this method returns the search results
     * with an enriched version of the items.
     * It is meant to be called when changing pages
     * so it doesn't affect performance.
     */
    const updateCurrentPageEnrichedItems = () => {
      if (isEmpty(enrichedItemsRef.current)) return results
      const enrichedResults = enrichItems(results, enrichedItemsRef.current)

      enrichedItemsRef.current = []
      return enrichedResults
    }

    const onPageChange = async page => {
      onQueryUpdate({ ...locationQuery, page })

      setResults(updateCurrentPageEnrichedItems())

      // Calculate offsetTop for searchContainer to scroll to it
      scrollToActions(searchContainer)

      // check if page is empty
      if (allResults[page - 1].some(missingId)) {
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

    useEffect(() => {
      setAllResults(paginateResults(results, ITEMS_PER_PAGE))
    }, [results])

    // effect to run after the user comes back from the item page
    useEffect(() => {
      setTimeout(() => {
        scrollToItemManager.scrollToItem()
      }, 500)
    }, [])

    const pages = allResults.length

    return (
      <FlexContainer data-test="searchResult" p={0} direction="ttb" id={'search-container'}>
        {allResults.length === 0 ? (
          <FlexContainer>No results</FlexContainer>
        ) : (
          <SearchResultContainer data-test="page">
            <FlexContainer px={0} py={1}>
              <H4>All Activities</H4>
            </FlexContainer>
            {allResults[currentPage - 1].map((item, i) => (
              <SearchItem
                key={item.uuid}
                item={item}
                index={i}
                onItemClick={onItemClick}
                updateItemRef={updateItemRef}
              />
            ))}
            {/* Rendering part after all results has been shown */}
            <BottomWrapper p={3 / 4} alignItems={'center'}>
              {allResults.length > 1 ? (
                <PaginationCenteredWrapper>
                  <Pagination
                    total={pages * ITEMS_PER_PAGE}
                    limit={ITEMS_PER_PAGE}
                    currentPage={currentPage}
                    onPageChange={onPageChange}
                  />

                  <TotalItemsWrapper p={0} alignItems={'center'} direction={'ltr'}>
                    <ExtraSmall>
                      <span>Total pages: </span>
                      {allResults.length}
                    </ExtraSmall>
                    <ExtraSmall>
                      <span>Total items: </span>
                      {flatten(allResults).length}
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
