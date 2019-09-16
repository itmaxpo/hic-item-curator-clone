import React, { useState, useRef, useEffect, useCallback } from 'react'
import { isEmpty, flatten } from 'lodash'
import { withRouter } from 'react-router-dom'
import { FlexContainer, ExtraSmall } from '@tourlane/tourlane-ui'
import PaginationWrapper from 'components/Pagination'
import SearchActions from './SearchActions'
import {
  paginateResults,
  // updatePaginatedItemByIndex,
  scrollToSearchActions,
  missingId
} from './utils'
import SearchItem from './SearchItem'
import {
  SearchResultContainer,
  PaginationCenteredWrapper,
  BottomWrapper,
  StyledLoader,
  TotalItemsWrapper
} from './styles'

/**
 * This is component, that is responsible for rendering all search results
 * Will receive Array<SearchResult> and transform it to Array<Array<SearchResult>>
 * for pagination feature
 * Wrapped in withRouter HOC to have access to <history>
 *
 *
 * @name SearchResultWrapper
 * @returns {Object} Search Result
 * @param {Array} results
 * @param {Function} fetchMoreItems
 * @param {Object} history from react-router
 * @param {Function} onLoadingChange to send isLoading state to parent
 *        (control showing create new item seaction)
 * @output {Function} updateSelectedResults (return Array<SearchResult> that are selected)
 */
export const SearchResultWrapper = withRouter(
  ({
    results,
    updateSelectedResults,
    fetchMoreItems,
    history,
    onLoadingChange,
    isLoading,
    query,
    onQueryUpdate
  }) => {
    const searchContainer = useRef(null)
    const [isAllSelected, setIsAllSelected] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [allResults, setAllResults] = useState([])
    const [allSelectedIds, setAllSelectedIds] = useState([])

    const enrichedItemsRef = useRef([])
    const itemsPerPage = 20
    // Send isLoading state to parent to control show/hide state of create item section
    const isLoadingChange = isLoading => {
      onLoadingChange(isLoading)
    }

    const updateItemRef = useCallback(updatedItem => {
      enrichedItemsRef.current.push(updatedItem)
    }, [])

    /* this method updates the current page items
     * with the enriched version of the item.
     * it is meant to be called when changing pages
     * so it doesn't affect performance, given that
     * changing pages already causes a re render of the items.
     */
    const updateCurrentPageEnrichedItems = () => {
      if (isEmpty(enrichedItemsRef.current)) return
      const newAllResults = allResults
      newAllResults[currentPage - 1] = enrichedItemsRef.current

      enrichedItemsRef.current = []

      setAllResults(newAllResults)
    }
    // If isSelected then add all current items to allSelectedIds
    const onAllSelectClick = isSelected => {
      const allIds = isSelected ? allResults[currentPage - 1].map(item => item.id) : []
      setAllSelectedIds(allIds)
      setIsAllSelected(isSelected)
    }

    const onActionSelected = action => {
      // TODO: When merge action would be clarified - process it here
      // USE: updateSelectedResults
    }

    const onPageChange = async page => {
      // If page changed diselect selected allItems
      setAllSelectedIds([])
      setIsAllSelected(false)

      updateCurrentPageEnrichedItems()

      // Calculate offsetTop for searchContainer to scroll to it
      scrollToSearchActions(searchContainer)

      // check if page is empty
      if (allResults[page - 1].some(missingId)) {
        isLoadingChange(true)

        try {
          // fetch more items, then we set the current page.
          await fetchMoreItems(page - 1, itemsPerPage)
          onQueryUpdate({ ...query, page })
          setCurrentPage(page)
        } catch (e) {
          console.warn(e)
        }
        isLoadingChange(false)
      } else {
        setCurrentPage(page)
      }
    }
    // Updates allSelectedIds array
    const onItemSelect = updatedItem => {
      const allIds = allSelectedIds.includes(updatedItem.id)
        ? allSelectedIds.filter(id => id !== updatedItem.id)
        : [...allSelectedIds, updatedItem.id]

      setAllSelectedIds(allIds)
    }

    const onItemClick = (e, item) => {
      // Prevent clicking event before item loaded || 'show more' clicked
      if (item.isLoading || e.target.nodeName === 'BUTTON') {
        e.preventDefault()
      } else {
        // Always should be on the top of the new page
        window.scrollTo(0, 0)
        history.push(`/item/${item.id}?language=en-GB`)
      }
    }

    useEffect(() => {
      setAllResults(paginateResults(results, itemsPerPage))
    }, [results, itemsPerPage])

    const pages = allResults.length

    return (
      <FlexContainer p={0} direction="ttb" id={'search-container'}>
        <SearchActions
          isAllSelected={isAllSelected}
          onAllSelectClick={onAllSelectClick}
          allResults={allResults}
          onActionSelected={onActionSelected}
          allSelectedIds={allSelectedIds}
        />

        {isLoading && <StyledLoader />}

        {allResults.length === 0 ? (
          <FlexContainer>No results</FlexContainer>
        ) : (
          <SearchResultContainer>
            {allResults[currentPage - 1].map((item, i) => (
              <SearchItem
                key={item.id}
                item={item}
                allSelectedIds={allSelectedIds}
                index={i}
                onItemSelect={onItemSelect}
                onItemClick={onItemClick}
                updateItemRef={updateItemRef}
              />
            ))}
            {/* Rendering part after all results has been shown */}
            <BottomWrapper p={3 / 4} alignItems={'center'}>
              {allResults.length > 1 ? (
                <PaginationCenteredWrapper>
                  <PaginationWrapper
                    total={pages * itemsPerPage}
                    limit={itemsPerPage}
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

export default SearchResultWrapper
