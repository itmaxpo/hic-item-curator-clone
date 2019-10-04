import { get, flatten, filter, isEmpty } from 'lodash'
import { paginateArray } from '../utils'
import { animateScroll as scroll } from 'react-scroll'
import { getItemFieldsById } from 'services/contentApi'

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
export const scrollToActions = searchContainer => {
  const searchContainerOffset = searchContainer.current
    ? searchContainer.current
    : document.querySelector('#search-container').offsetTop
  scroll.scrollTo(searchContainerOffset, { duration: 800, delay: 0, smooth: 'easeOutQuad' })
}

export const missingId = item => !item.id

// Returns array of item's parent name and fetched status
export const getParentNameList = items =>
  !isEmpty(items) ? items.map(({ parentId }) => ({ id: parentId, name: null, fetched: false })) : []

export const getItemsNames = async items => {
  const arrayOfPromises = items.map(({ id }) => getItemFieldsById(id))

  return await Promise.all(arrayOfPromises).then(values => {
    return values.map(parseNameFieldsResponse)
  })
}

const parseNameFieldsResponse = response => {
  if (!response) return null

  const nameField = filter(response.data.fields, field => field.field_name === 'name')

  return {
    id: response.data.uuid,
    name: nameField ? getItemName(nameField) : null
  }
}
// Check for EN then DE name
const getItemName = nameField => {
  const engField = filter(nameField, ({ locale }) => locale === 'en-GB')[0]
  const deField = filter(nameField, ({ locale }) => locale === 'de-DE')[0]

  return get(engField, 'content') || get(deField, 'content') || null
}

export const updateItemsWithNames = (listToUpdate, listWithNames) =>
  listToUpdate.map(item => {
    if (item.name) return item

    const name = getItemNameById(listWithNames, item.id)

    return { ...item, name, fetched: true }
  })

export const getItemNameById = (list, _id) =>
  get(list.filter(({ id }) => id === _id), '0.name', null)

export const updateItemsWithArea = (listToUpdate, listWithAreas) =>
  listToUpdate.map(item => {
    if (item.area) return item

    const area = getItemNameById(listWithAreas, item.parentId)

    return { ...item, area }
  })

export const removeMergedItems = (list, itemsToRemove) =>
  list.filter(listItem => !itemsToRemove.some(item => item.id === get(listItem, 'id')))
