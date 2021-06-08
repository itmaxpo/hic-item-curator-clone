import { get, set, trim } from 'lodash'
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

  const generateQueryByProp = (propName) => ({
    bool: {
      must: [
        {
          nested: {
            path: propName,
            query: {
              bool: {
                must: values.map((val) => ({
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
      should: propNames.map((prop) => generateQueryByProp(prop))
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

  const generateQueryByProp = (propName) => ({
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
                  path: 'ancestors_tree',
                  query: {
                    bool: {
                      must: [
                        {
                          match: {
                            'ancestors_tree.uuid': countryId
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
                must: values.map((val) => ({
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
      should: propNames.map((prop) => generateQueryByProp(prop))
    }
  }
}

// elastic search doesn't treat properly dots
// ".st." -> "st"
// "st.st" -> "st st"
const replaceDots = (str) => trim(str, '.').replaceAll('.', ' ')

/**
 * Return query to search by accommodation
 *
 * @param {string} country
 * @param {string} area
 * @param {string} supplier
 * @param {string} name
 * @returns <ElasticSearchQuery>
 */
export const generateSearchQueryAccom = (
  country,
  area,
  supplier,
  _name,
  filterByMissingGeolocation,
  blocked
) => {
  // To handle strings with spaces (e.g. 'south ') - split a string by ' '
  const name = _name.split(' ').map(replaceDots)

  const mustPath = 'bool.should.0.bool.must'
  const mustNotPath = 'bool.should.0.bool.must_not'

  const query = {
    bool: {
      should: [
        {
          bool: {
            must: [],
            must_not: []
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
    name.forEach((nameToSearch) => {
      const nameQuery = {
        nested: {
          path: 'name',
          query: {
            bool: {
              must: [
                {
                  wildcard: {
                    'name.content': `${nameToSearch}*`
                  }
                }
              ]
            }
          }
        }
      }
      set(query, mustPath, [...get(query, mustPath, []), nameQuery])
    })
  }

  if (filterByMissingGeolocation) {
    const missingGeolocationQuery = {
      nested: {
        path: 'geolocation',
        query: {
          exists: {
            field: 'geolocation'
          }
        }
      }
    }
    set(query, mustNotPath, missingGeolocationQuery)
  }
  if (blocked) {
    const blockedQuery = {
      nested: {
        path: 'blocked',
        query: {
          bool: {
            must: [
              {
                exists: {
                  field: 'blocked'
                }
              }
            ]
          }
        }
      }
    }
    set(query, mustPath, [...get(query, mustPath, []), blockedQuery])
  }
  return query
}

// SEARCH API UTILS END
