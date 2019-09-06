import { isEmpty, chunk, get, ceil, flatten } from 'lodash'

// Used to store or utilities used on the page
export const filterEmptyEntities = entities => entities.filter(entity => !isEmpty(entity))

// Used to create paginated array
export const paginateArray = (arr, pageSize = 10) => chunk(arr, pageSize)

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
// Check for EN then DE name if no such names - get original_name
const getItemTitle = item => {
  const nameFields = get(item, 'fields.name')
  const engField = nameFields.filter(({ locale }) => locale === 'en-GB')[0]
  const deField = nameFields.filter(({ locale }) => locale === 'de-DE')[0]

  return engField
    ? get(engField, 'content')
    : deField
    ? get(deField, 'content')
    : get(item, 'fields.original_name.0.content')
}

// give shape to the items
const parseItems = (items, itemType) =>
  items.map(item => ({
    id: item.id,
    type: itemType,
    title: getItemTitle(item),
    description: '',
    photos: [],
    isLoading: true
  }))

// eslint-disable-next-line array-callback-return
const createArrayOfSize = size => Array.apply(null, Array(size)).map(() => {})

// create the pages
// TODO: more comments
export const createPages = (items, arraySize) =>
  paginateArray(createArrayOfSize(arraySize).map((_, idx) => items[idx]))

// parse search response data
// sets the structure of the item also sets the pages (array of arrays - chunks of 10 items)
export const parseSearchResponse = (data, arraySize, itemType) =>
  createPages(parseItems(data, itemType), arraySize)

export const calculateOffsetAndIndex = (page, itemsPerPage) => {
  // index of page in the data array
  const index = itemsPerPage * page

  // given that we always get items by chunks of 50
  // we divide the index of the missing page by 5 and ceil it
  const offset = ceil(index / 5)

  return { offset, index }
}

// inserts new page and paginates array
export const insertPage = (pages, index, items, itemType) => {
  // we have to flatten the pages to insert the items correctly and then paginate it (chunks of 10)
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
