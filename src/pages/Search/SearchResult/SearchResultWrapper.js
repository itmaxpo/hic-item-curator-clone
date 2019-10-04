import React, { useState, useRef, useEffect, useCallback } from 'react'
import { isEmpty, map, flatten, uniqBy } from 'lodash'
import { withRouter } from 'react-router-dom'
import { FlexContainer, ExtraSmall } from '@tourlane/tourlane-ui'
import PaginationWrapper from 'components/Pagination'
import Actions from './Actions'
import {
  paginateResults,
  scrollToActions,
  missingId,
  getParentNameList,
  getItemsNames,
  updateItemsWithNames,
  getItemNameById,
  updateItemsWithArea,
  removeMergedItems
} from './utils'
import { calculateOffsetAndIndex } from '../utils'
import SearchItem from './SearchItem'
import {
  SearchResultContainer,
  PaginationCenteredWrapper,
  BottomWrapper,
  StyledLoader,
  TotalItemsWrapper
} from './styles'
import MergeItems from './MergeItems'
import { ACCOMMODATION_ITEM_TYPE } from 'utils/constants'

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
    setResults,
    updateSelectedResults,
    fetchMoreItems,
    history,
    onLoadingChange,
    isLoading,
    locationQuery,
    onQueryUpdate,
    itemType,
    country
  }) => {
    const itemsPerPage = 20

    const searchContainer = useRef(null)
    const [isAllSelected, setIsAllSelected] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedItems, setSelectedItems] = useState([])
    const [isMergeOpen, setIsMergeOpen] = useState(false)

    const [allResults, setAllResults] = useState(paginateResults(results, itemsPerPage))
    const [parentNameList, setParentNameList] = useState(
      uniqBy(getParentNameList(allResults[currentPage - 1]), 'id')
    )

    const enrichedItemsRef = useRef([])
    // Send isLoading state to parent to control show/hide state of create item section
    const isLoadingChange = isLoading => {
      onLoadingChange(isLoading)
    }

    const updateItemRef = useCallback((updatedItem, isMerged) => {
      if (isMerged) enrichedItemsRef.current = [updatedItem, ...enrichedItemsRef.current]
      else enrichedItemsRef.current.push(updatedItem)
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
    // If isSelected then add all current items to selectedItems
    const onAllSelectClick = isSelected => {
      const selected = isSelected ? allResults[currentPage - 1] : []
      setSelectedItems(selected)
      setIsAllSelected(isSelected)
    }

    const onActionClick = (action, items) => {
      switch (action) {
        case 'merge':
          // update selected items with the area name when opening merge items modal
          if (!isEmpty(selectedItems)) {
            const selectedItemsWithAreaName = updateItemsWithArea(selectedItems, parentNameList)
            setSelectedItems(selectedItemsWithAreaName)
          }
          setIsMergeOpen(true)
          break
        default:
          break
      }
    }

    const onPageChange = async page => {
      // If page changed diselect selected allItems
      setSelectedItems([])
      setIsAllSelected(false)

      updateCurrentPageEnrichedItems()

      // Calculate offsetTop for searchContainer to scroll to it
      scrollToActions(searchContainer)

      // check if page is empty
      if (allResults[page - 1].some(missingId)) {
        isLoadingChange(true)

        try {
          // fetch more items, then we set the current page.
          await fetchMoreItems(page - 1, itemsPerPage)
          setCurrentPage(page)
        } catch (e) {
          console.warn(e)
        }
        isLoadingChange(false)
      } else {
        setCurrentPage(page)
      }
    }
    // Updates selectedItems array
    const onItemSelect = updatedItem => {
      const allIds = map(selectedItems, 'id').includes(updatedItem.id)
        ? selectedItems.filter(({ id }) => id !== updatedItem.id)
        : [...selectedItems, updatedItem]

      setSelectedItems(allIds)
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

    const onMerge = (mergedItem, itemsMerged) => {
      setSelectedItems([])

      const { index } = calculateOffsetAndIndex(currentPage - 1, itemsPerPage)

      const newResults = removeMergedItems(results, itemsMerged)

      newResults.splice(index, 0, mergedItem)

      setResults(newResults)
      window.scrollTo(0, 0)
    }

    useEffect(() => {
      setAllResults(paginateResults(results, itemsPerPage))
    }, [results, itemsPerPage])

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

    const pages = allResults.length

    return (
      <FlexContainer p={0} direction="ttb" id={'search-container'}>
        <MergeItems
          isOpen={isMergeOpen}
          onClose={() => {
            setIsMergeOpen(false)
          }}
          onMerge={onMerge}
          items={selectedItems}
          country={country}
        />
        <Actions
          isAllSelected={isAllSelected}
          onAllSelectClick={onAllSelectClick}
          allResults={allResults}
          onActionClick={onActionClick}
          selectedItems={selectedItems}
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
                country={country}
                areaName={getItemNameById(parentNameList, item.parentId)}
                selectedItems={selectedItems}
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
