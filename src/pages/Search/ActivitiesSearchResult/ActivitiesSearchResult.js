import React, { useState, useRef, useEffect, useCallback } from 'react'
import { isEmpty, flatten, uniqBy } from 'lodash'
import { withRouter } from 'react-router-dom'
import { FlexContainer, ExtraSmall, H4 } from '@tourlane/tourlane-ui'
import Pagination from 'components/Pagination'
import {
  paginateResults,
  scrollToActions,
  missingId,
  getParentNameList,
  getItemsNames,
  updateItemsWithNames,
  enrichItems
} from './utils'
import SearchItem from './SearchItem'
import {
  SearchResultContainer,
  PaginationCenteredWrapper,
  BottomWrapper,
  TotalItemsWrapper
} from './styles'
import { ACCOMMODATION_ITEM_TYPE, ITEMS_PER_PAGE } from 'utils/constants'
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
 * @param {Boolean} isLoading - search is in progress
 * @param {Object} locationQuery - query url
 * @param {Function} onQueryUpdate - callback to update query url
 * @param {String} itemType - type of items searched and displayed
 * @param {String} country - country of items searched and displayed
 * @param {Object} history from react-router
 * @returns {Function} Search Result component
 */
export const ActivitiesSearchResult = withRouter(
  ({
    history,
    results,
    setResults,
    fetchMoreItems,
    isLoading,
    locationQuery,
    onQueryUpdate,
    itemType,
    country,
    page
  }) => {
    const searchContainer = useRef(null)
    const [currentPage, setCurrentPage] = useState(page || 1)
    const [allResults, setAllResults] = useState(paginateResults(results, ITEMS_PER_PAGE))
    const [parentNameList, setParentNameList] = useState(
      uniqBy(getParentNameList(allResults[currentPage - 1]), 'id')
    )

    const enrichedItemsRef = useRef([])

    const updateItemRef = useCallback((updatedItem, isMerged) => {
      if (isMerged) enrichedItemsRef.current = [updatedItem, ...enrichedItemsRef.current]
      else enrichedItemsRef.current.push(updatedItem)
    }, [])

    /* this method returns the search results
     * with an enriched version of the items.
     * It is meant to be called when changing pages
     * or after merging items so it doesn't affect performance,
     * given that these two actions already causes a re render of the items.
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

    const onItemClick = (e, item) => {
      // Prevent clicking event before item loaded || 'show more' clicked
      if (item.isLoading || e.target.nodeName === 'BUTTON') {
        e.preventDefault()
      } else {
        scrollToItemManager.setItemToScrollTo(item.id)
        history.push(`/item/${item.id}?language=en-GB`)
      }
    }

    useEffect(() => {
      setAllResults(paginateResults(results, ITEMS_PER_PAGE))
    }, [results])

    // on page changes, feed the parentNameList with the new parent ids with fetched names
    useEffect(() => {
      async function getParentNames() {
        let newParentNameList = uniqBy(
          [...parentNameList, ...getParentNameList(allResults[currentPage - 1])],
          'id'
        )

        const itemsToFetchNames = newParentNameList.filter(({ fetched }) => fetched === false)

        const parentNames = await getItemsNames(itemsToFetchNames)

        newParentNameList = updateItemsWithNames(newParentNameList, parentNames)

        setParentNameList(newParentNameList)
      }

      if (itemType === ACCOMMODATION_ITEM_TYPE) getParentNames()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage])

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
                key={item.id}
                item={item}
                country={country}
                selectedItems={[]}
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
