import { get, isEmpty } from 'lodash'
import { COUNTRY_ITEM_TYPE, AREA_ITEM_TYPE, ACCOMMODATION_ITEM_TYPE } from 'utils/constants'

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
// Get correct item name or original_name
export const getItemName = item => {
  const nameFields = get(item, 'fields.name')
  const engName = nameFields.filter(name => name.locale === 'en-GB')
  const deName = nameFields.filter(name => name.locale === 'de-DE')

  return (
    get(!isEmpty(engName) ? engName : deName, '0.content') ||
    get(item, 'fields.original_name.0.content')
  )
}

// To support names by locale, revisit filtering.
export const parseSearchResponse = data => {
  const getIsActive = val => !!get(val, 'fields.active_destination.0.content')
  // Sorted by active_destination
  return data
    .sort((v1, v2) => getIsActive(v2) - getIsActive(v1))
    .map(item => ({
      value: item.id,
      label: getItemName(item)
    }))
}

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
