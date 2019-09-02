import { get, find, flatten, isArray } from 'lodash'
import { getCountryName } from 'services/isoCodes'

// FIELD NAMES CONSTANTS
const FIELD_ISO_CODE = 'iso_code'
const FIELD_NAME = 'name'
const FIELD_DESCRIPTION = 'description'
const FIELD_GEOLOCATION = 'geolocation'
const FIELD_MEAL_BASE = 'meal_base'

// PARSE FROM BE ITEM TO FE - START
// HELPERS - START
/**
 * get name from the item
 * it is a separate function, because needed check
 * Get name or original_name instead
 *
 * @param {Object} item
 */
const getFieldName = item => {
  const name = isArray(item.fields) && item.fields.find(field => field.field_name === FIELD_NAME)
  return get(name, 'content')
}

/**
 * Get content from item field by fieldName
 *
 * @param {Object} item
 * @param {String} fieldName
 */
const getFieldContent = (item, fieldName) => {
  const field = find(get(item, 'fields'), c => c.field_name === fieldName)
  return get(field, 'content')
}
// HELPERS - END

// PARSE METHODS - START
/**
 * Receive item and returns parsed COUNTRY item
 *
 * @param {Object} item
 */
export const parseCountryItem = item => {
  const country = {
    id: item.uuid,
    title: getCountryName(getFieldContent(item, FIELD_ISO_CODE)),
    type: item.item_type,
    language: 'DE',
    offerVisualisation: {
      description: getFieldContent(item, FIELD_DESCRIPTION),
      photos: []
    }
  }

  //   rooms: [
  //     { type: 'Queen Room', mealbase: 'MB INFO', description: 'Some stuff about queens' },
  //   ],
  //   photos: [
  //     {
  //       isLoading: false,
  //       isError: false,
  //       isSelected: false,
  //       isVisible: false,
  //       value: 'https://loremflickr.com/320/240/travel'
  //     }]
  //   }

  return country
}

/**
 * Receive item and returns parsed COUNTRY item
 *
 * @param {Object} item
 */
export const parseAreaItem = (item, polygon) => {
  const area = {
    id: item.uuid,
    title: getFieldName(item),
    type: item.item_type,
    language: 'DE',
    offerVisualisation: {
      description: getFieldContent(item, FIELD_DESCRIPTION),
      photos: [],
      polygon: flatten(polygon.coordinates)
    }
  }

  return area
}

/**
 * Receive item and returns parsed COUNTRY item
 *
 * @param {Object} item
 */
export const parseAccommodationItem = (item, accomRooms) => {
  const coordinates = getFieldContent(item, FIELD_GEOLOCATION)

  const accom = {
    id: item.uuid,
    title: getFieldName(item),
    type: item.item_type,
    language: 'DE',
    offerVisualisation: {
      description: getFieldContent(item, FIELD_DESCRIPTION),
      photos: [],
      rooms: accomRooms.map(room => ({
        name: getFieldName(room) || 'Room',
        description: getFieldContent(room, FIELD_DESCRIPTION),
        mealbase: getFieldContent(room, FIELD_MEAL_BASE)
      })),
      coordinates: {
        lat: +coordinates.lat,
        lng: +coordinates.lon
      }
    }
  }

  return accom
}
// PARSING METHODS - END
// PARSE FROM BE ITEM TO FE - END

// PARSE FROM FE ITEM TO BE - START
// HELPERS - START
/**
 * Transform FE value to BE field
 *
 * @param {Object} item
 */
const transformValueIntoField = (value, type, language) => ({
  field_name: type,
  content: value,
  locale: 'en-GB',
  source: 'item_curator',
  source_key: 'item_curator',
  content_type: typeof value
})
// HELPERS - END

// PARSE METHODS - START
/**
 * Receive item and returns parsed COUNTRY item
 *
 * @param {Object} item
 */
export const transformCountryItem = item => {
  const fields = [
    transformValueIntoField(item.offerVisualisation.description, FIELD_DESCRIPTION, item.language)
  ]

  return fields
}

/**
 * Receive item and returns parsed COUNTRY item
 *
 * @param {Object} item
 */
export const transformAreaItem = item => {
  const fields = [
    transformValueIntoField(item.offerVisualisation.description, FIELD_DESCRIPTION, item.language)
  ]

  return fields
}

/**
 * Receive item and returns parsed COUNTRY item
 *
 * @param {Object} item
 */
export const transformAccommodationItem = item => {
  console.log(item)
  const fields = [
    transformValueIntoField(item.title, FIELD_NAME, item.language),
    transformValueIntoField(item.offerVisualisation.description, FIELD_DESCRIPTION, item.language)
  ]

  return fields
}
// PARSING METHODS - END
// PARSE FROM FE ITEM TO BE - START
