import { isEmpty, chunk, get, flatten } from 'lodash'
import { getFieldBySourcePriority } from 'utils/helpers'

// Used to store or utilities used on the page
export const filterEmptyEntities = entities => entities.filter(entity => !isEmpty(entity))

// Used to create paginated array
export const paginateArray = (arr, pageSize = 20) => chunk(arr, pageSize)

// Used to return 's' if counter > 2. E.g.: `Photo{addSToString(2)}` -> Photos
export const addSToString = counter => (counter !== 1 ? 's' : '')

// Capitalize first letter in string
export const capitalize = str => str[0].toUpperCase() + str.slice(1)

// Generate Array from 1 to N
export const generateArrayTo = n => [...Array(n).keys()]

// Move element [from] iomdex [to] index and return updatedArray
export const moveFromTo = (arr, from, to) => {
  const newArr = [...arr]
  newArr.splice(to, 0, newArr.splice(from, 1)[0])
  return newArr
}

// Add element to concrete index
export const addElementToIndex = (arr, to, elem) => {
  arr.splice(to, 0, elem)
  return arr
}

// Check for EN then DE value then whatever is there
const getFieldValue = field => {
  const engField = field.filter(({ locale }) => locale === 'en-GB')
  const deField = field.filter(({ locale }) => locale === 'de-DE')

  return (
    get(getFieldBySourcePriority(engField), 'content') ||
    get(getFieldBySourcePriority(deField), 'content') ||
    get(field[0], 'content')
  )
}

// Check for names based on this order: EN name -> DE name -> original_name -> whatever other name
const getItemTitle = (nameField, item) => {
  const engField = nameField.filter(({ locale }) => locale === 'en-GB')[0]
  const deField = nameField.filter(({ locale }) => locale === 'de-DE')[0]
  const originalName = get(item, 'fields.original_name.0.content')

  return engField
    ? get(engField, 'content')
    : deField
    ? get(deField, 'content')
    : originalName
    ? originalName
    : get(nameField, '0.content')
}

export const parseItem = (item, itemType, isLoading = true) => ({
  id: item.id,
  parentId: item.parent_uuid,
  type: itemType || item.item_type,
  title: getItemTitle(item.fields.name, item),
  description: getFieldValue(item.fields.description) || 'No description found.',
  allImages: [],
  isLoading,
  isMerged: !!item.isMerged
})

// give shape to the items
const parseItems = (items, itemType) => items.map(item => parseItem(item, itemType))

// eslint-disable-next-line array-callback-return
const createArrayOfSize = size => Array.apply(null, Array(size)).map(() => {})

// create the pages:
// we get only the first two pages (40 items) but we get the total items
// so we create the pages (even the empty ones) to correctly build
// our pagination component
export const createPages = (items, arraySize) =>
  paginateArray(createArrayOfSize(arraySize).map((_, idx) => items[idx]))

// parse search response data
// sets the structure of the item also sets the pages (array of arrays - chunks of 20 items)
export const parseSearchResponse = (data, arraySize, itemType) =>
  createPages(parseItems(data, itemType), arraySize)

// index of page in the data array (before paginating).
// equals offset.
export const calculateIndex = (page, itemsPerPage) => itemsPerPage * page

// inserts new page and paginates array
export const insertPage = (pages, index, items, itemType) => {
  // we have to flatten the pages to insert the items correctly and then paginate it (chunks of 20)
  const draftNewPages = flatten(pages)

  // parse the items to give them the shape we use
  const parsedItems = parseItems(items, itemType)

  for (let i = 0; i < parsedItems.length; i++) {
    draftNewPages[index + i] = parsedItems[i]
  }

  // to avoid creating new pages at the end
  // we keep reducing the index of insertion
  // until the new pages have the same size
  // as the original
  if (draftNewPages.length > flatten(pages).length) {
    return insertPage(pages, index - 1, items, itemType)
  }

  return paginateArray(draftNewPages)
}
