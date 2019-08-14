import React, { useState, useRef } from 'react'
import { withRouter } from 'react-router-dom'
import { FlexContainer, Dropdown } from '@tourlane/tourlane-ui'
import Loader from 'components/Loader'
import PaginationWrapper from 'components/Pagination'
import SearchActions from './SearchActions'
import {
  getMockedResults,
  paginateResults,
  updatePaginatedItemByIndex,
  updateAllPaginatedItems,
  scrollToSearchActions
} from './utils'
import SearchItem from './SearchItem'
import {
  SearchResultContainer,
  PaginationCenteredWrapper,
  BottomWrapper,
  ItemsPerPageWrapper
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
  ({ results, isLoading = false, updateSelectedResults, history }) => {
    const searchContainer = useRef(null)
    const [isAllSelected, setIsAllSelected] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [allResults, setAllResults] = useState(paginateResults(getMockedResults(), 10))

    const pages = allResults.length
    const itemsPerPageOptions = [
      { value: 10, label: '10' },
      { value: 20, label: '20' },
      { value: 30, label: '30' },
      { value: 40, label: '40' },
      { value: 50, label: '50' }
    ]

    const onAllSelectClick = isSelected => {
      const selectedResults = updateAllPaginatedItems(allResults, 'isSelected', isSelected)
      setIsAllSelected(!isAllSelected)
      setAllResults(selectedResults)
    }

    const onActionSelected = action => {
      // TODO: When merge action would be clarified - process it here
      // USE: updateSelectedResults
    }

    const onPageChange = page => {
      // Calculate offsetTop for searchContainer to scroll to it
      scrollToSearchActions(searchContainer)
      setCurrentPage(page)
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
        history.push('/item/123')
      }
    }

    const onItemsPerPageChange = newItemsPerPage => {
      // Scroll to top only if itemsPerPage become smaller than current
      if (newItemsPerPage < itemsPerPage) {
        scrollToSearchActions(searchContainer)
      }
      setItemsPerPage(newItemsPerPage)
      setAllResults(paginateResults(getMockedResults(), newItemsPerPage))
    }

    if (isLoading) {
      return <Loader />
    }

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
                key={i}
                item={item}
                index={i}
                onItemSelect={onItemSelect}
                onItemClick={onItemClick}
              />
            ))}
            {/* Rendering part after all results has been shown */}
            <BottomWrapper p={3 / 4} alignItems={'center'}>
              {allResults.length > 1 ? (
                <PaginationCenteredWrapper>
                  <PaginationWrapper
                    total={pages * itemsPerPage}
                    limit={itemsPerPage}
                    pageCount={itemsPerPage}
                    currentPage={currentPage}
                    onPageChange={onPageChange}
                  />
                </PaginationCenteredWrapper>
              ) : (
                <PaginationCenteredWrapper />
              )}

              <ItemsPerPageWrapper p={0} direction={'ltr'}>
                <p>Show: </p>
                <Dropdown
                  value={itemsPerPage}
                  options={itemsPerPageOptions}
                  onChange={onItemsPerPageChange}
                />
              </ItemsPerPageWrapper>
            </BottomWrapper>
          </SearchResultContainer>
        )}
      </FlexContainer>
    )
  }
)

export default SearchResultWrapper
