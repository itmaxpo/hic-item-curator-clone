import { get } from 'lodash'
import { ACCOMMODATION_ITEM_TYPE, AREA_ITEM_TYPE, COUNTRY_ITEM_TYPE } from 'utils/constants'

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
      return !country
    case ACCOMMODATION_ITEM_TYPE:
      return !(area && country)
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

export const parseSearchResponse = (data) =>
  data
    .map(({ uuid, name, original_name }) => ({ label: original_name ?? name, value: uuid }))
    .sort((a, b) => a?.label?.localeCompare(b?.label))

export const getQueryValue = (query, propLabel, propValue) => {
  // if there is no label and value should return null to show placeholder
  if (get(query, propValue) && get(query, propLabel)) {
    return {
      value: get(query, propValue),
      label: get(query, propLabel)
    }
  }

  return undefined
}
