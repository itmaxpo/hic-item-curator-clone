import { get, set, trim } from 'lodash'

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
  area = undefined,
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
        path: 'ancestors_tree',
        query: {
          bool: {
            must: [
              {
                match: {
                  'ancestors_tree.uuid': area ?? country
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
    name.forEach((nameToSearch, index) => {
      const nameQuery = {
        nested: {
          path: 'name',
          query: {
            bool: {
              must: [
                {
                  wildcard: {
                    'name.content': index === 0 ? `*${nameToSearch}*` : `* ${nameToSearch}*`
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
