import React, { useState, useRef, useEffect } from 'react'
import { isEmpty } from 'lodash'
import { withRouter } from 'react-router-dom'
import { FlexContainer } from '@tourlane/tourlane-ui'
import PaginationWrapper from 'components/Pagination'
import SearchActions from './SearchActions'
import {
  paginateResults,
  updatePaginatedItemByIndex,
  updateAllPaginatedItems,
  scrollToSearchActions,
  missingId
} from './utils'
import SearchItem from './SearchItem'
import {
  SearchResultContainer,
  PaginationCenteredWrapper,
  BottomWrapper,
  StyledLoader
} from './styles'

/**
 * This is component, that is responsible for rendering all search results
 * Will receive Array<SearchResult> and transform it to Array<Array<SearchResult>>
 * for pagination feature
 * Wrapped in withRouter HOC to have access to <history>
 *
 * @name SearchResultWrapper
 * @returns {Object} Search Result
 * @output {Function} updateSelectedResults (return Array<SearchResult> that are selected)
 */
export const SearchResultWrapper = withRouter(
  ({ results, updateSelectedResults, fetchMoreItems, history }) => {
    const searchContainer = useRef(null)
    const [isLoading, setIsLoading] = useState(false)
    const [isAllSelected, setIsAllSelected] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [allResults, setAllResults] = useState([])

    const enrichedItemsRef = useRef([])
    const itemsPerPage = 10

    const updateItemRef = updatedItem => {
      enrichedItemsRef.current.push(updatedItem)
    }

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

    const onAllSelectClick = isSelected => {
      const selectedResults = updateAllPaginatedItems(allResults, 'isSelected', isSelected)
      setIsAllSelected(!isAllSelected)
      setAllResults(selectedResults)
    }

    const onActionSelected = action => {
      // TODO: When merge action would be clarified - process it here
      // USE: updateSelectedResults
    }

    const onPageChange = async page => {
      updateCurrentPageEnrichedItems()

      // Calculate offsetTop for searchContainer to scroll to it
      scrollToSearchActions(searchContainer)

      // check if page is empty
      if (allResults[page - 1].some(missingId)) {
        setIsLoading(true)
        try {
          // fetch more items, then we set the current page.
          await fetchMoreItems(page - 1, itemsPerPage)
          setCurrentPage(page)
        } catch (e) {
          console.warn(e)
        }
        setIsLoading(false)
      } else {
        setCurrentPage(page)
      }
    }

    const onItemSelect = (updatedItem, index) => {
      const updatedItems = updatePaginatedItemByIndex(
        currentPage - 1,
        index,
        updatedItem,
        allResults
      )
      setAllResults(updatedItems)
    }

    const onItemClick = (e, item) => {
      if (e.target.nodeName === 'BUTTON') {
        e.preventDefault()
      } else {
        // Always should be on the top of the new page
        window.scrollTo(0, 0)
        history.push(`/item/${item.id}`)
      }
    }

    useEffect(() => {
      setAllResults(paginateResults(results, itemsPerPage))
    }, [results, itemsPerPage])

    if (isLoading) {
      return <StyledLoader />
    }

    const pages = allResults.length

    return (
      <FlexContainer p={0} direction="ttb" id={'search-container'}>
        <SearchActions
          isAllSelected={isAllSelected}
          onAllSelectClick={onAllSelectClick}
          allResults={allResults}
          onActionSelected={onActionSelected}
        />

        {allResults.length === 0 ? (
          <FlexContainer>No results</FlexContainer>
        ) : (
          <SearchResultContainer>
            {allResults[currentPage - 1].map((item, i) => (
              <SearchItem
                key={item.id}
                item={item}
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
                    pageCount={allResults.length > 10 ? 10 : allResults.length}
                    currentPage={currentPage}
                    onPageChange={onPageChange}
                  />
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
