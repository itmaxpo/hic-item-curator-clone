import { get } from 'lodash'
import { COUNTRY_ITEM_TYPE, AREA_ITEM_TYPE, ACCOMMODATION_ITEM_TYPE } from 'pages/ItemPage/utils'

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
    case COUNTRY_ITEM_TYPE:
    case AREA_ITEM_TYPE:
      if (country) {
        return false
      } else {
        return true
      }
    case ACCOMMODATION_ITEM_TYPE:
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
    case COUNTRY_ITEM_TYPE:
      if (country) {
        return country
      } else {
        return undefined
      }
    case AREA_ITEM_TYPE:
      if (country && area) {
        return area
      } else {
        return undefined
      }
    default:
      return undefined
  }
}

// To support names by locale, revisit filtering.
export const parseSearchResponse = data =>
  data.map(item => ({
    value: item.id,
    label:
      get(get(item, 'fields.name').filter(name => name.locale === 'en-GB'), '0.content') ||
      get(item, 'fields.original_name.0.content')
  }))
