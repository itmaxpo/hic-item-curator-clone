import { flatten } from 'lodash'
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

// Update every isSelected item in paginated array
export const updateSelectedPaginatedItems = (items, prop, value) =>
  items.map(itemArray =>
    itemArray.map(item => (item.isSelected ? { ...item, [prop]: value } : item))
  )

// Will receive Array<Array<Item>> and find by <page> correct array
// and by <updatedIndex> correct element to update
export const updatePaginatedItemByIndex = (page, updatedIndex, updatedItem, items) =>
  items.map((itemArray, arrayIndex) =>
    arrayIndex === page
      ? itemArray.map((item, index) => (index === updatedIndex ? updatedItem : item))
      : itemArray
  )

// Will receive selectedItems in paginated array and return unwrapped Array of selected items
export const getSelectedItems = (items, selectedIds) =>
  flatten(items).filter(item => selectedIds.includes(item.id))

// Calculate offsetTop for searchContainer to scroll to it
export const scrollToSearchActions = searchContainer => {
  const searchContainerOffset = searchContainer.current
    ? searchContainer.current
    : document.querySelector('#search-container').offsetTop
  scroll.scrollTo(searchContainerOffset, { duration: 800, delay: 0, smooth: 'easeOutQuad' })
}

export const missingId = item => !item.id
