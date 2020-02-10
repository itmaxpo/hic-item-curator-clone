import { get, set } from 'lodash'
// SEARCH API UTILS START

/**
 * Return query to search by countries
 *
 * @param {Array<string>} propNames
 * @param {string} value
 * @returns <ElasticSearchQuery>
 */
export const generateSearchQueryCountry = (propNames, value) => {
  // To handle strings with spaces (e.g. 'south ') - split a string by ' '
  const values = value.includes(' ') ? value.split(' ') : [value]

  const generateQueryByProp = propName => ({
    bool: {
      must: [
        {
          nested: {
            path: propName,
            query: {
              bool: {
                must: values.map(val => ({
                  wildcard: {
                    [`${propName}.content`]: `${val}*`
                  }
                }))
              }
            }
          }
        }
      ]
    }
  })

  return {
    bool: {
      should: propNames.map(prop => generateQueryByProp(prop))
    }
  }
}

/**
 * Return query to search by admin_area
 *
 * @param {Array<string>} propNames
 * @param {string} value
 * @returns <ElasticSearchQuery>
 */
export const generateSearchQueryArea = (countryId, propNames, value) => {
  // To handle strings with spaces (e.g. 'south ') - split a string by ' '
  const values = value.includes(' ') ? value.split(' ') : [value]

  const generateQueryByProp = propName => ({
    bool: {
      must: [
        {
          bool: {
            should: [
              {
                match: {
                  parent_uuid: countryId
                }
              },
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
              }
            ]
          }
        },
        {
          nested: {
            path: propName,
            query: {
              bool: {
                must: values.map(val => ({
                  wildcard: {
                    [`${propName}.content`]: `${val}*`
                  }
                }))
              }
            }
          }
        }
      ]
    }
  })

  return {
    bool: {
      should: propNames.map(prop => generateQueryByProp(prop))
    }
  }
}

/**
 * Return query to search by accommodation
 *
 * @param {string} country
 * @param {string} area
 * @param {string} supplier
 * @param {string} name
 * @returns <ElasticSearchQuery>
 */
export const generateSearchQueryAccom = (country, area, supplier, _name) => {
  // To handle strings with spaces (e.g. 'south ') - split a string by ' '
  const name = _name.includes(' ') ? _name.split(' ') : [_name]

  const mustPath = 'bool.should.0.bool.must'
  const query = {
    bool: {
      should: [
        {
          bool: {
            must: []
          }
        }
      ]
    }
  }

  if (area || country) {
    const ancestorQuery = {
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
    }
    set(query, mustPath, [...get(query, mustPath, []), ancestorQuery])
  }

  if (supplier) {
    const supplierQuery = {
      nested: {
        path: 'dmc_id',
        query: {
          bool: {
            must: [
              {
                match: {
                  'dmc_id.source': supplier
                }
              }
            ]
          }
        }
      }
    }
    set(query, mustPath, [...get(query, mustPath, []), supplierQuery])
  }

  if (name) {
    const nameQuery = {
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
    set(query, mustPath, [...get(query, mustPath, []), nameQuery])
  }

  return query
}

// SEARCH API UTILS END
