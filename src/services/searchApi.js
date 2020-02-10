import queryString from 'query-string'
import { isEmpty } from 'lodash'
import request from './request'
import {
  generateSearchQueryCountry,
  generateSearchQueryArea,
  generateSearchQueryAccom
} from './utils'
import { mockItems } from './mocks'

const onLighthouseMode = queryString.parse(window.location.search).lighthouse === 'true'

const nameProperties = ['name', 'original_name']
/**
 * Returns countries filtered by name
 *
 * @name getCountries
 * @param {String} name
 * @returns {Object}
 */
const getCountries = async name => {
  const nameToSearch = isEmpty(name) ? '' : name.toLowerCase()

  let res
  // add a condition to modify request if it is e2e test environment
  if (window.Cypress || process.env.REACT_APP_CI) {
    res = await request('POST', `${process.env.REACT_APP_KIWI_SEARCH_API}?test-country`, {})
  } else {
    res = await request('POST', process.env.REACT_APP_KIWI_SEARCH_API, {
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
const getAreasInCountry = async ({ name, country }, offset = 0, limit = 40) => {
  const nameToSearch = isEmpty(name) ? '' : name.toLowerCase()

  let res
  // add a condition to modify request if it is e2e test environment
  if (window.Cypress || process.env.REACT_APP_CI) {
    res = await request('POST', `${process.env.REACT_APP_KIWI_SEARCH_API}?test-area`, {})
  } else {
    res = await request('POST', process.env.REACT_APP_KIWI_SEARCH_API, {
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

/**
 * Returns accommodations
 *
 * @name getAccommodations
 * @param {Object} payload { country, area, name, supplier }
 * @param {Number} offset
 * @param {Number} limit
 * @returns {Object}
 */
const getAccommodations = async (
  { country, area, name = '', supplier = '' },
  offset = 0,
  limit = 40
) => {
  if (onLighthouseMode) return mockItems

  const nameToSearch = isEmpty(name) ? '' : name.toLowerCase()

  let res
  // add a condition to modify request if it is e2e test environment
  if (window.Cypress || process.env.REACT_APP_CI) {
    res = await request('POST', `${process.env.REACT_APP_KIWI_SEARCH_API}?test-accommodation`, {})
  } else {
    res = await request('POST', process.env.REACT_APP_KIWI_SEARCH_API, {
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
        query: generateSearchQueryAccom(country, area, supplier, nameToSearch)
      }
    })
  }

  return res.json()
}

export { getCountries, getAreasInCountry, getAccommodations }
