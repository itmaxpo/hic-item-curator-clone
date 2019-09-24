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
 * @param {Array<string>} propNames
 * @param {string} value
 * @returns <ElasticSearchQuery>
 */
export const generateSearchQueryAccom = (country, area, supplier, propNames, value) => {
  // To handle strings with spaces (e.g. 'south ') - split a string by ' '
  const values = value.includes(' ') ? value.split(' ') : [value]

  const generateQueryByProp = propName => ({
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
            path: 'supplier_tag',
            query: {
              bool: {
                must: [
                  {
                    wildcard: {
                      'supplier_tag.content': `${supplier.toLowerCase() || ''}`
                    }
                  }
                ]
              }
            }
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

// SEARCH API UTILS END
