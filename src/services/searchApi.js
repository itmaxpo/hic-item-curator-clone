import request from './request'

/**
 * Returns countries filtered by name
 *
 * @name getCountries
 * @param {String} name
 * @returns {Object}
 */
const getCountries = async name => {
  let res = await request('POST', process.env.REACT_APP_KIWI_SEARCH_API, {
    body: { item_type: 'country', query: { name: { content: `${name}*` } } }
  })

  return res.json()
}

/**
 * Returns areas of a country filtered by name
 *
 * @name getAreasInCountry
 * @param {String} name
 * @param {String} countryId
 * @param {Number} offset
 * @param {Number} limit
 * @returns {Object}
 */
const getAreasInCountry = async (name, countryId, offset = 0, limit = 50) => {
  let res = await request('POST', process.env.REACT_APP_KIWI_SEARCH_API, {
    body: {
      item_type: 'admin_area',
      offset,
      limit,
      query: { name: { content: `${name}*` }, ancestors: { content: countryId } }
    }
  })

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
  limit = 50
) => {
  let res = await request('POST', process.env.REACT_APP_KIWI_SEARCH_API, {
    body: {
      item_type: 'accommodation',
      offset,
      limit,
      query: {
        name: { content: `${name}*`, source: `${supplier}*` },
        ancestors: { content: area || country }
      }
    }
  })

  return res.json()
}

/**
 * Returns suppliers (dmcs)
 *
 * @name getSuppliers
 * @returns {Object}
 */
const getSuppliers = async () => {
  let res = await request('GET', process.env.REACT_APP_KIWI_SUPPLIERS_API)

  return res.json()
}

export { getCountries, getAreasInCountry, getAccommodations, getSuppliers }
