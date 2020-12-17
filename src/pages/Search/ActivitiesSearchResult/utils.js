import { get, find } from 'lodash'
import { paginateArray } from '../utils'
import { animateScroll as scroll } from 'react-scroll'

/** Will do next checks:
 *  - add to every result isSelected property
 *  - will create <Array<Array<Item>> for pagination
 */
export const paginateResults = (results, itemsPerPage) => {
  return paginateArray(results.map(r => ({ ...r, isSelected: false })), itemsPerPage)
}

// Update every item in paginated array
export const updateAllPaginatedItems = (items, prop, value) =>
  items.map(itemArray => itemArray.map(item => ({ ...item, [prop]: value })))

// Will receive Array<Array<Item>> and find by <page> correct array
// and by <updatedIndex> correct element to update
export const updatePaginatedItemByIndex = (page, updatedIndex, updatedItem, items) =>
  items.map((itemArray, arrayIndex) =>
    arrayIndex === page
      ? itemArray.map((item, index) => (index === updatedIndex ? updatedItem : item))
      : itemArray
  )

// Calculate offsetTop for searchContainer to scroll to it
export const scrollToActions = searchContainer => {
  const searchContainerOffset = searchContainer.current
    ? searchContainer.current
    : document.querySelector('#search-container').offsetTop
  scroll.scrollTo(searchContainerOffset, { duration: 800, delay: 0, smooth: 'easeOutQuad' })
}

export const missingId = item => !item.uuid

export const enrichItems = (itemsToEnrich, enrichedItems) =>
  itemsToEnrich.map(itemToEnrich => ({
    ...itemToEnrich,
    ...find(enrichedItems, enrichedItem => enrichedItem.uuid === get(itemToEnrich, 'uuid'))
  }))
