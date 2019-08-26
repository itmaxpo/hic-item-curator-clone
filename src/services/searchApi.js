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
    body: {
      item_types: ['country'],
      query: {
        bool: {
          must: [
            {
              nested: {
                path: 'name',
                query: {
                  bool: {
                    must: [
                      {
                        wildcard: {
                          'name.content': `${name}*`
                        }
                      }
                    ]
                  }
                }
              }
            }
          ]
        }
      }
    }
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
      item_types: ['admin_area'],
      offset,
      limit,
      query: {
        bool: {
          must: [
            {
              nested: {
                path: 'ancestors',
                query: {
                  bool: {
                    must: [
                      {
                        match: {
                          'ancestors.content': `kiwi://Elephant/Item/${countryId}`
                        }
                      }
                    ]
                  }
                }
              }
            },
            {
              nested: {
                path: 'name',
                query: {
                  bool: {
                    must: [
                      {
                        wildcard: {
                          'name.content': `${name}*`
                        }
                      }
                    ]
                  }
                }
              }
            }
          ]
        }
      }
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
      item_types: ['accommodation'],
      offset,
      limit,
      query: {
        bool: {
          must: [
            {
              nested: {
                path: 'ancestors',
                query: {
                  bool: {
                    must: [
                      {
                        match: {
                          'ancestors.content': `kiwi://Elephant/Item/${area || country}`
                        }
                      }
                    ]
                  }
                }
              }
            },
            {
              nested: {
                path: 'dmc_id',
                query: {
                  bool: {
                    must: [
                      {
                        wildcard: {
                          'dmc_id.source': `${supplier}*`
                        }
                      }
                    ]
                  }
                }
              }
            },
            {
              nested: {
                path: 'name',
                query: {
                  bool: {
                    must: [
                      {
                        wildcard: {
                          'name.content': `${name}*`
                        }
                      }
                    ]
                  }
                }
              }
            }
          ]
        }
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
