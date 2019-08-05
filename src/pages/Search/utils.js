import { isEmpty, chunk } from 'lodash'

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
