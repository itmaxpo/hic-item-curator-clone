import React, { useState, useRef, useEffect, useCallback } from 'react'
import { isEmpty, map, uniqBy } from 'lodash'
import { withRouter } from 'react-router-dom'
import { FlexContainer, H4, Big, Container } from '@tourlane/tourlane-ui'
import Actions from './Actions'
import {
  getParentNameList,
  getItemsNames,
  updateItemsWithNames,
  getItemNameById,
  updateItemsWithArea
} from './utils'
import SearchItem from './SearchItem'
import { SearchResultContainer } from './styles'
import MergeItems from './MergeItems'
import { ACCOMMODATION_ITEM_TYPE } from 'utils/constants'
import { scrollToItemManager } from 'utils/ScrollToItemManager'
import { useNotification } from 'components/Notification'

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
export const SearchResult = withRouter(
  ({
    history,
    results: {
      data,
      meta: { total_count }
    },
    fetchMoreItems,
    isLoading,
    itemType,
    country
  }) => {
    const [isAllSelected, setIsAllSelected] = useState(false)
    const [selectedItems, setSelectedItems] = useState([])
    const [isMergeOpen, setIsMergeOpen] = useState(false)
    const { enqueueNotification } = useNotification()
    const [parentNameList, setParentNameList] = useState(uniqBy(getParentNameList(data, 'id')))

    const enrichedItemsRef = useRef([])

    const updateItemRef = useCallback((updatedItem, isMerged) => {
      if (isMerged) enrichedItemsRef.current = [updatedItem, ...enrichedItemsRef.current]
      else enrichedItemsRef.current.push(updatedItem)
    }, [])

    // If isSelected then add all current items to selectedItems
    const onAllSelectClick = (isSelected) => {
      const selected = isSelected ? data : []
      setSelectedItems(selected)
      setIsAllSelected(isSelected)
    }

    const onActionClick = (action) => {
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

    const onPageChange = useCallback(async () => {
      // If page changed diselect selected allItems
      setSelectedItems([])
      setIsAllSelected(false)

      try {
        // fetch more items, then we set the current page.
        await fetchMoreItems()
      } catch (e) {
        enqueueNotification({ variant: 'error', message: e || 'We could not fetch more' })
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Updates selectedItems array
    const onItemSelect = (updatedItem) => {
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
        scrollToItemManager.setItemToScrollTo(item.id)
        history.push(`/item/${item.id}?language=en-GB`)
      }
    }

    const onMerge = async () => {
      setSelectedItems([])
      await fetchMoreItems(null, null, null, 0)
      window.scrollTo(0, 0)
    }

    // on page changes, feed the parentNameList with the new parent ids with fetched names
    useEffect(() => {
      async function getParentNames() {
        let newParentNameList = uniqBy(
          [...parentNameList, ...getParentNameList(data)],

          'id'
        )

        const itemsToFetchNames = newParentNameList.filter(({ fetched }) => fetched === false)

        const parentNames = await getItemsNames(itemsToFetchNames)

        newParentNameList = updateItemsWithNames(newParentNameList, parentNames)

        setParentNameList(newParentNameList)
      }

      if (itemType === ACCOMMODATION_ITEM_TYPE) getParentNames()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

    // effect to run after the user comes back from the item page
    useEffect(() => {
      setTimeout(() => {
        scrollToItemManager.scrollToItem()
      }, 500)
    }, [])

    const onCloseMergeModal = useCallback(() => {
      setIsMergeOpen(false)
    }, [])

    /**Gives us access to the DOM elements */
    const observer = useRef(null)

    /** Used to monitor when the last card comes into view */
    const monitorNode = useCallback(
      (node) => {
        /**
       *  disable the entire IntersectionObserver
        (disconnect from Previous node that still has the observer)
       * */
        if (observer.current) {
          observer.current.disconnect()
        }

        /**
         * creating a new instance of the observer
         * and the callback is called when the element comes into view
         */
        observer.current = new IntersectionObserver(async ([entry]) => {
          if (entry.isIntersecting && data.length < total_count) {
            await onPageChange()
          }
        })

        if (node) {
          observer.current.observe(node)
        }
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [onPageChange, observer, data, total_count]
    )

    const renderResults = () => {
      if (data.length === 0 && !isLoading) {
        return (
          <FlexContainer justifyContent="center" fullHeight>
            <H4>No results</H4>
          </FlexContainer>
        )
      }

      return (
        <SearchResultContainer data-test="page">
          {!isLoading && (
            <Container p={0} pt={1} pb={1 / 2}>
              <Big bold>{total_count} Results found</Big>
            </Container>
          )}

          {data.map((item, index) => {
            return (
              <SearchItem
                ref={data.length === index + 1 ? monitorNode : null}
                key={item.id}
                item={item}
                itemType={itemType}
                country={country}
                areaName={getItemNameById(parentNameList, item.parentId)}
                selectedItems={selectedItems}
                index={index}
                onItemSelect={onItemSelect}
                onItemClick={onItemClick}
                updateItemRef={updateItemRef}
                selectable={
                  itemType !== ACCOMMODATION_ITEM_TYPE ||
                  selectedItems.length < 2 ||
                  selectedItems.map(({ id }) => id).includes(item.id)
                } /** restrict more than two items to select in the case of the accommodation */
              />
            )
          })}
        </SearchResultContainer>
      )
    }

    return (
      <FlexContainer data-test="searchResult" p={0} direction="ttb" id={'search-container'}>
        <MergeItems
          isOpen={isMergeOpen}
          onClose={onCloseMergeModal}
          onMerge={onMerge}
          items={selectedItems}
          country={country}
        />
        {selectedItems.length > 1 && (
          <Actions
            isAllSelected={isAllSelected}
            onAllSelectClick={onAllSelectClick}
            onActionClick={onActionClick}
            selectedItems={selectedItems}
            itemType={itemType}
            selectAllRequired={itemType !== ACCOMMODATION_ITEM_TYPE}
          />
        )}

        {renderResults()}
      </FlexContainer>
    )
  }
)

export default SearchResult
