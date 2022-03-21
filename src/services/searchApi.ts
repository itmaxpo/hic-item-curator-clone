import { isEmpty } from 'lodash'
import request from './request'
import {
  generateSearchQueryCountry,
  generateSearchQueryArea,
  generateSearchQueryAccom
} from './utils'

const SEARCH_API_URL = `${process.env.REACT_APP_PARTNERS_API}/search/v1/items`

export interface IData {
  id: string
  parent_uuid: string
  item_type: string
  fields: {
    name: string
    description: string
    blocked: string
    dmc_id: string
    external_id: string
  }
  isMerged: boolean
}
export type meta = {
  total_count: number
  count: number
}
interface ApiResults {
  data: IData[]
  meta: meta
}
const nameProperties = ['name', 'original_name']
/**
 * Returns countries filtered by name
 *
 * @name getCountries
 * @param {String} name
 * @returns {Object}
 */
const getCountries = async (name: string) => {
  const nameToSearch = isEmpty(name) ? '' : name.toLowerCase()

  let res
  // add a condition to modify request if it is e2e test environment
  // @ts-ignore
  if (window.Cypress || process.env.REACT_APP_CI) {
    res = await request('POST', `${SEARCH_API_URL}?test-country`, {})
  } else {
    res = await request('POST', SEARCH_API_URL, {
      body: {
        item_types: ['country'],
        query: generateSearchQueryCountry(nameProperties, nameToSearch)
      }
    })
  }

  return res.json()
}

/**
 * Returns areas of a country filtered by name
 * This is a request to Elastic search (https://www.elastic.co/blog/lost-in-translation-boolean-operations-and-filters-in-the-bool-query)
 * query: bool: must works similarly to logical AND
 *        second bool works similarly to logical OR
 * We should search for the name and original_name
 * Bec asue sometimes there is no name || original_name
 *
 * @name getAreasInCountry
 * @param {Object} payload { name, country }
 * @param {Number} offset
 * @param {Number} limit
 * @returns {Object}
 */
const getAreasInCountry = async (
  { name = '', country = '' }: { name: string; country: string },
  offset = 0,
  limit = 40
): Promise<{ data: any; meta: meta }> => {
  const nameToSearch = isEmpty(name) ? '' : name.toLowerCase()

  let res
  // add a condition to modify request if it is e2e test environment
  // @ts-ignore
  if (window.Cypress || process.env.REACT_APP_CI) {
    res = await request('POST', `${SEARCH_API_URL}?test-area`, {})
  } else {
    res = await request('POST', SEARCH_API_URL, {
      body: {
        item_types: ['admin_area'],
        offset,
        limit,
        sort: {
          'name.content.raw': {
            nested_path: 'name',
            order: 'asc'
          },
          'original_name.content.raw': {
            nested_path: 'original_name',
            order: 'asc'
          }
        },
        query: generateSearchQueryArea(country, nameProperties, nameToSearch)
      }
    })
  }

  return res.json()
}
export type SearchQuery = string | string[] | null

export interface ISearchQueryAccom {
  country: string
  area: string | undefined
  name: string
  supplier: string
  provider?: SearchQuery
  missingGeolocation?: boolean
  blocked?: boolean
}

declare global {
  interface Window {
    Cypress: object
  }
}

const getAccommodations = async (
  {
    country,
    area,
    name = '',
    supplier = '',
    missingGeolocation = false,
    blocked = false
  }: ISearchQueryAccom,
  offset: number = 0,
  limit: number = 40
): Promise<ApiResults> => {
  const nameToSearch = isEmpty(name) ? '' : name.toLowerCase()
  area = !!area ? area : undefined
  let res
  // add a condition to modify request if it is e2e test environment
  if (window.Cypress || process.env.REACT_APP_CI) {
    res = await request('POST', `${SEARCH_API_URL}?test-accommodation`, {})
  } else {
    res = await request('POST', SEARCH_API_URL, {
      body: {
        item_types: ['accommodation'],
        offset,
        limit,
        sort: {
          'name.content.raw': {
            nested_path: 'name',
            order: 'asc'
          }
        },
        // We are asking only for 'name' property because accommodations don't have original_name
        query: generateSearchQueryAccom(
          country,
          area,
          supplier,
          nameToSearch,
          missingGeolocation,
          blocked
        )
      }
    })
  }
  return res.json()
}

/**
 * Returns activities
 *
 * @name getActivities
 * @param {Object} payload { name, supplier, country }
 * @param {Number} offset
 * @param {Number} limit
 * @returns {Object}
 */
const getActivities = async (
  { name = '', supplier = '', country = '', provider = '', active = true },
  offset = 0,
  limit = 40
) => {
  const nameToSearch = isEmpty(name) ? '' : name.toLowerCase()
  const res = await request(
    'GET',
    `${process.env.REACT_APP_PARTNERS_API}/content/activities?limit=${limit}&offset=${offset}&supplier_id=${supplier}&provider=${provider}&country_uuid=${country}&name=${nameToSearch}&active=${active}`
  )

  return res.json()
}

export { getCountries, getAreasInCountry, getAccommodations, getActivities }
