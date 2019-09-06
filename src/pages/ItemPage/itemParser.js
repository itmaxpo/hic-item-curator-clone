import { get, find, isArray } from 'lodash'
import { getCountryName } from 'services/isoCodes'

// FIELD NAMES CONSTANTS
export const FIELD_ISO_CODE = 'iso_code'
export const FIELD_NAME = 'name'
export const FIELD_DESCRIPTION = 'description'
export const FIELD_GEOLOCATION = 'geolocation'
export const FIELD_MEAL_BASE = 'meal_base'

// PARSE FROM BE ITEM TO FE - START
// HELPERS - START
/**
 * get name from the item
 * it is a separate function, because needed check
 * Get name or original_name instead
 *
 * @param {Object} item
 */
export const getFieldName = item => {
  // TODO: Remove this check when room type is fixed
  if (isArray(item.fields)) {
    const nameFields = item.fields.filter(field => field.field_name === FIELD_NAME)
    const engField = nameFields.filter(name => name.locale === 'en-GB')[0]
    const deField = nameFields.filter(name => name.locale === 'de-DE')[0]

    // Return EN, if no EN then DE, if no DE - null
    return engField ? get(engField, 'content') : deField ? get(deField, 'content') : null
  }
}

/**
 * Get content from item field by fieldName
 *
 * @param {Object} item
 * @param {String} fieldName
 */
export const getFieldContent = (item, fieldName) => {
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
    parentId: item.parent_uuid,
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
export const parseAreaItem = item => {
  const area = {
    id: item.uuid,
    parentId: item.parent_uuid,
    title: getFieldName(item),
    type: item.item_type,
    language: 'DE',
    offerVisualisation: {
      description: getFieldContent(item, FIELD_DESCRIPTION),
      photos: [],
      polygon: []
    }
  }

  return area
}

/**
 * Receive item and returns parsed COUNTRY item
 *
 * @param {Object} item
 */
export const parseAccommodationItem = item => {
  const coordinates = getFieldContent(item, FIELD_GEOLOCATION)

  const accom = {
    id: item.uuid,
    parentId: item.parent_uuid,
    title: getFieldName(item),
    type: item.item_type,
    language: 'DE',
    offerVisualisation: {
      description: getFieldContent(item, FIELD_DESCRIPTION),
      photos: [],
      rooms: [],
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
  const fields = [
    transformValueIntoField(item.title, FIELD_NAME, item.language),
    transformValueIntoField(item.offerVisualisation.description, FIELD_DESCRIPTION, item.language)
  ]

  return fields
}
// PARSING METHODS - END
// PARSE FROM FE ITEM TO BE - START
