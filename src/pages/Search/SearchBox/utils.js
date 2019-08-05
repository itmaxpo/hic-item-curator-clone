/**
 * Defines if search button should be disabled.
 *
 * @name shouldDisableSearchButton
 * @param {String} category
 * @param {String} country
 * @param {String} area
 * @returns {Boolean}
 */
export const shouldDisableSearchButton = (category, country, area) => {
  switch (category) {
    case 'country':
    case 'area':
      if (country) {
        return false
      } else {
        return true
      }
    case 'accommodation':
      if (area && country) {
        return false
      } else {
        return true
      }
    default:
      return true
  }
}

/**
 * Defines search button go to destination label
 *
 * @name getGoToDestination
 * @param {String} category
 * @param {String} country
 * @param {String} area
 * @returns {String}
 */
export const getGoToDestination = (category, country, area) => {
  switch (category) {
    case 'country':
      if (country) {
        return country
      } else {
        return undefined
      }
    case 'area':
      if (country && area) {
        return area
      } else {
        return undefined
      }
    default:
      return undefined
  }
}

/**
 * Defines search box behavior based on the selected category.
 *
 * @name getCategoryBasedBehavior
 * @param {String} category
 * @param {String} country
 * @param {String} area
 * @returns {Object}
 */

export const getCategoryBasedBehavior = (category, country, area) => ({
  shouldDisableSearchButton: shouldDisableSearchButton(category, country, area),
  getGoToDestination: getGoToDestination(category, country, area)
})
