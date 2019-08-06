import { flatten } from 'lodash'
import { filterEmptyEntities, paginateArray } from '../utils'
import { STATUS_IN_PROGRESS } from 'components/StatusIndicator/StatusIndicator'

export const getMockedResults = () => [
  {
    title: 'Arakur Ushuaia Resort',
    subtitle: 'Malvinas, Ushuaia, Argentina',
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
      sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
      Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
      nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
      reprehenderit in voluptate velit esse cillum dolore eu fugiat 
      nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
      sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    status: STATUS_IN_PROGRESS,
    photos: [{ name: 'First' }]
  },
  {
    title: 'Arakur Ushuaia Resort 1',
    subtitle: 'Malvinas, Ushuaia, Argentina',
    description: '',
    status: STATUS_IN_PROGRESS,
    photos: [{ name: 'First' }]
  },
  {
    title: 'Arakur Ushuaia Resort 2',
    subtitle: 'Malvinas, Ushuaia, Argentina',
    description: '',
    status: STATUS_IN_PROGRESS,
    photos: [{ name: 'First' }]
  },
  {
    title: 'Arakur Ushuaia Resort 3',
    subtitle: 'Malvinas, Ushuaia, Argentina',
    description: '',
    status: STATUS_IN_PROGRESS,
    photos: [{ name: 'First' }]
  },
  {
    title: 'Arakur Ushuaia Resort 4',
    subtitle: 'Malvinas, Ushuaia, Argentina',
    description: '',
    status: STATUS_IN_PROGRESS,
    photos: [{ name: 'First' }]
  },
  {
    title: 'Arakur Ushuaia Resort 5',
    subtitle: 'Malvinas, Ushuaia, Argentina',
    description: '',
    status: STATUS_IN_PROGRESS,
    photos: [{ name: 'First' }]
  },
  {
    title: 'Arakur Ushuaia Resort 6',
    subtitle: 'Malvinas, Ushuaia, Argentina',
    description: '',
    status: STATUS_IN_PROGRESS,
    photos: [{ name: 'First' }]
  },
  {
    title: 'Arakur Ushuaia Resort 7',
    subtitle: 'Malvinas, Ushuaia, Argentina',
    description: '',
    status: STATUS_IN_PROGRESS,
    photos: [{ name: 'First' }]
  },
  {
    title: 'Arakur Ushuaia Resort 8',
    subtitle: 'Malvinas, Ushuaia, Argentina',
    description: '',
    status: STATUS_IN_PROGRESS,
    photos: []
  },
  {
    title: 'Arakur Ushuaia Resort 9',
    subtitle: 'Malvinas, Ushuaia, Argentina',
    description: '',
    status: STATUS_IN_PROGRESS,
    photos: [{ name: 'First' }]
  },
  {
    title: 'Arakur Ushuaia Resort 10',
    subtitle: 'Malvinas, Ushuaia, Argentina',
    description: '',
    status: STATUS_IN_PROGRESS,
    photos: [{ name: 'First' }]
  },
  {
    title: 'Arakur Ushuaia Resort 11',
    subtitle: 'Malvinas, Ushuaia, Argentina',
    description: '',
    status: STATUS_IN_PROGRESS,
    photos: [{ name: 'First' }]
  },
  {
    title: 'Arakur Ushuaia Resort 12',
    subtitle: 'Malvinas, Ushuaia, Argentina',
    description: '',
    status: STATUS_IN_PROGRESS,
    photos: [{ name: 'First' }]
  },
  {
    title: 'Arakur Ushuaia Resort 13',
    subtitle: 'Malvinas, Ushuaia, Argentina',
    description: '',
    status: STATUS_IN_PROGRESS,
    photos: [{ name: 'First' }]
  },
  {
    title: 'Arakur Ushuaia Resort 14',
    subtitle: 'Malvinas, Ushuaia, Argentina',
    description: '',
    status: STATUS_IN_PROGRESS,
    photos: [{ name: 'First' }]
  },
  {
    title: 'Arakur Ushuaia Resort 15',
    subtitle: 'Malvinas, Ushuaia, Argentina',
    description: '',
    status: STATUS_IN_PROGRESS,
    photos: [{ name: 'First' }]
  },
  {
    title: 'Arakur Ushuaia Resort 16',
    subtitle: 'Malvinas, Ushuaia, Argentina',
    description: '',
    status: STATUS_IN_PROGRESS,
    photos: [{ name: 'First' }]
  },
  {
    title: 'Arakur Ushuaia Resort 17',
    subtitle: 'Malvinas, Ushuaia, Argentina',
    description: '',
    status: STATUS_IN_PROGRESS,
    photos: [{ name: 'First' }]
  },
  {
    title: 'Arakur Ushuaia Resort 18',
    subtitle: 'Malvinas, Ushuaia, Argentina',
    description: '',
    status: STATUS_IN_PROGRESS,
    photos: [{ name: 'First' }]
  },
  {
    title: 'Arakur Ushuaia Resort 19',
    subtitle: 'Malvinas, Ushuaia, Argentina',
    description: '',
    status: STATUS_IN_PROGRESS,
    photos: [{ name: 'First' }]
  },
  {
    title: 'Arakur Ushuaia Resort 20',
    subtitle: 'Malvinas, Ushuaia, Argentina',
    description: '',
    status: STATUS_IN_PROGRESS,
    photos: [{ name: 'First' }]
  },
  {
    title: 'Arakur Ushuaia Resort 21',
    subtitle: 'Malvinas, Ushuaia, Argentina',
    description: '',
    status: STATUS_IN_PROGRESS,
    photos: [{ name: 'First' }]
  },
  {
    title: 'Arakur Ushuaia Resort 22',
    subtitle: 'Malvinas, Ushuaia, Argentina',
    description: '',
    status: STATUS_IN_PROGRESS,
    photos: [{ name: 'First' }]
  },
  {
    title: 'Arakur Ushuaia Resort 23',
    subtitle: 'Malvinas, Ushuaia, Argentina',
    description: '',
    status: STATUS_IN_PROGRESS,
    photos: [{ name: 'First' }]
  },
  {
    title: 'Arakur Ushuaia Resort 24',
    subtitle: 'Malvinas, Ushuaia, Argentina',
    description: '',
    status: STATUS_IN_PROGRESS,
    photos: [{ name: 'First' }]
  },
  {
    title: 'Arakur Ushuaia Resort 25',
    subtitle: 'Malvinas, Ushuaia, Argentina',
    description: '',
    status: STATUS_IN_PROGRESS,
    photos: [{ name: 'First' }]
  },
  {
    title: 'Arakur Ushuaia Resort 26',
    subtitle: 'Malvinas, Ushuaia, Argentina',
    description: '',
    status: STATUS_IN_PROGRESS,
    photos: [{ name: 'First' }]
  }
]

/** Will do next checks:
 *  - filter all empty elements
 *  - add to every result isSelected property
 *  - will create <Array<Array<Item>> for pagination
 */
export const paginateResults = results => {
  return paginateArray(filterEmptyEntities(results).map(r => ({ ...r, isSelected: false })))
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
export const getSelectedItems = items => flatten(items).filter(item => item.isSelected)
