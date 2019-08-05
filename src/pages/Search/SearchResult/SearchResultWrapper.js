import React, { useState, useRef } from 'react'
import { FlexContainer } from '@tourlane/tourlane-ui'
import { isEmpty } from 'lodash'
import Loader from 'components/Loader'
import SearchActions from './SearchActions'
import { animateScroll as scroll } from 'react-scroll'
import {
  getMockedResults,
  paginateResults,
  updatePaginatedItemByIndex,
  updateAllPaginatedItems,
  updateSelectedPaginatedItems,
  getSelectedItems
} from './utils'
import SearchItem from './SearchItem'
import { SearchResultContainer } from './styles'

/**
 * This is component, that is responsible for rendering all search results
 * Will receive Array<SearchResult> and transform it to Array<Array<SearchResult>>
 * for pagination feature
 *
 * @name SearchResultWrapper
 * @returns {Object} Search Result
 * @output {Function} updateSelectedResults (return Array<SearchResult> that are selected)
 */
export const SearchResultWrapper = ({ results, isLoading = false, updateSelectedResults }) => {
  const searchContainer = useRef(null)
  const [isAllSelected, setIsAllSelected] = useState(false)
  const [actionSelected, setActionSelected] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [allResults, setAllResults] = useState(paginateResults(getMockedResults()))

  const pages = allResults.length

  const onAllSelectClick = () => {
    const selectedResults = updateAllPaginatedItems(allResults, 'isSelected', !isAllSelected)
    setIsAllSelected(!isAllSelected)
    setAllResults(selectedResults)
  }

  const onStatusSelect = status => {
    // Do nothing if status was cleared
    if (isEmpty(status)) {
      return
    }
    const selectedResults = updateSelectedPaginatedItems(allResults, 'status', status)
    setActionSelected(status)
    setAllResults(selectedResults)
    updateSelectedResults(getSelectedItems(selectedResults))
  }

  const onPageChange = page => {
    // Calculate offsetTop for searchContainer to scroll to it
    const searchContainerOffset = searchContainer.current
      ? searchContainer.current
      : document.querySelector('#search-container').offsetTop
    scroll.scrollTo(searchContainerOffset, { duration: 800, delay: 0, smooth: 'easeOutQuad' })
    setCurrentPage(page)
  }

  const onItemSelect = (updatedItem, index) => {
    const updatedItems = updatePaginatedItemByIndex(currentPage - 1, index, updatedItem, allResults)
    setAllResults(updatedItems)
  }

  if (isLoading) {
    return <Loader />
  }

  return (
    <FlexContainer p={0} direction="ttb" id={'search-container'}>
      <SearchActions
        isAllSelected={isAllSelected}
        onAllSelectClick={onAllSelectClick}
        actionSelected={actionSelected}
        onStatusSelect={onStatusSelect}
        dropdownPlacement={'bottom'}
      />

      {allResults.length === 0 ? (
        <FlexContainer>No results</FlexContainer>
      ) : (
        <SearchResultContainer>
          {allResults[currentPage - 1].map((item, i) => (
            <SearchItem key={i} item={item} index={i} onItemSelect={onItemSelect} />
          ))}
        </SearchResultContainer>
      )}

      {allResults[currentPage - 1].length > 5 && (
        <SearchActions
          isAllSelected={isAllSelected}
          onAllSelectClick={onAllSelectClick}
          actionSelected={actionSelected}
          onStatusSelect={onStatusSelect}
          dropdownPlacement={'top'}
          currentPage={currentPage}
          pages={pages}
          onPageChange={onPageChange}
        />
      )}
    </FlexContainer>
  )
}

export default SearchResultWrapper
