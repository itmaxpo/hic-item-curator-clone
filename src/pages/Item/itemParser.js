import { get, filter, isArray, isObject, isEmpty } from 'lodash'
import {
  SOURCE,
  SUPPLY,
  COUNTRY_ITEM_TYPE,
  AREA_ITEM_TYPE,
  ACCOMMODATION_ITEM_TYPE
} from 'utils/constants'
import { getFieldBySourcePriority } from 'utils/helpers'

// LOCALES
export const locales = ['en-GB', 'en-US', 'de-DE', 'fr-FR', 'nl-NL']

// FIELD NAMES CONSTANTS
export const FIELD_ISO_CODE = 'iso_code'
export const FIELD_NAME = 'name'
export const FIELD_ORIGINAL_NAME = 'original_name'
export const FIELD_DESCRIPTION = 'description'
export const FIELD_GEOLOCATION = 'geolocation'
export const FIELD_ADDRESS = 'address'
export const FIELD_MEAL_BASE = 'meal_base'
export const FIELD_ACTIVE_DESTINATION = 'active_destination'
export const FIELD_SAFETY = 'safety'
export const FIELD_CURRENCY = 'currency'
export const FIELD_TRANSPORT = 'transport'
export const FIELD_CUISINE = 'cuisine'
export const FIELD_CLIMATE = 'climate'
export const FIELD_DRESS = 'dress'
export const FIELD_ADDITIONAL = 'additional_info'
export const FIELD_HEALTH = 'health'
export const FIELD_ELECTRICITY = 'electricity'
export const FIELD_ENTRY_REQUIREMENTS = 'entry_requirements'
export const FIELD_ADMIN_LEVEL = 'admin_level'
export const FIELD_POLYGON = 'polygon'
export const FIELD_ROOMS = 'rooms'
export const FIELD_PHOTOS = 'photos'
export const FIELD_SUPPLIER_TAG = 'supplier_tag'
export const FIELD_FRONT_DESK_PHONE = 'front_desk_phone'
export const FIELD_ACCOMM_CATEGORY = 'accommodation_category' //TODO: Check TRIP-17
export const FIELD_BLOCKED = 'blocked'
export const FIELD_ACCOMM_RANKING = 'ranking'
export const FIELD_VISUALIZATION_DESTINATION = 'visualization_destination'

// ITEM SAME FOR ALL TYPES FIELDS (+PHOTOS)
export const itemSameFields = [FIELD_NAME, FIELD_DESCRIPTION]
// ITEM SAME FIELDS WITHOUT LOCALE
export const itemSameFieldsNoLocale = []
// ITEM TYPE SPECIFIC FIELDS WITHOUT LOCALE
export const itemSpecificFieldsNoLocale = {
  [COUNTRY_ITEM_TYPE]: [FIELD_ACTIVE_DESTINATION],
  [AREA_ITEM_TYPE]: [FIELD_ACTIVE_DESTINATION, FIELD_VISUALIZATION_DESTINATION],
  [ACCOMMODATION_ITEM_TYPE]: [
    FIELD_ADDRESS,
    FIELD_GEOLOCATION,
    FIELD_SUPPLIER_TAG,
    FIELD_FRONT_DESK_PHONE,
    FIELD_ACCOMM_CATEGORY,
    FIELD_BLOCKED,
    FIELD_ACCOMM_RANKING
  ]
}
// ITEM TYPE SPECIFIC FIELDS
export const itemSpecificFields = {
  [COUNTRY_ITEM_TYPE]: [
    FIELD_SAFETY,
    FIELD_CURRENCY,
    FIELD_TRANSPORT,
    FIELD_CUISINE,
    FIELD_CLIMATE,
    FIELD_DRESS,
    FIELD_ADDITIONAL,
    FIELD_HEALTH,
    FIELD_ELECTRICITY,
    FIELD_ENTRY_REQUIREMENTS
  ],
  [AREA_ITEM_TYPE]: [
    FIELD_SAFETY,
    FIELD_CURRENCY,
    FIELD_TRANSPORT,
    FIELD_CUISINE,
    FIELD_CLIMATE,
    FIELD_DRESS,
    FIELD_ADDITIONAL,
    FIELD_HEALTH,
    FIELD_ELECTRICITY,
    FIELD_ENTRY_REQUIREMENTS
  ],
  [ACCOMMODATION_ITEM_TYPE]: []
}

// PARSE FROM BE ITEM TO FE - START
// HELPERS - START
/**
 * Receives item (getter)
 * Returns map with all same fields for all types withotu locale
 *
 * @param {Object} item
 * @returns {Object}
 */
export const getItemSameFieldsNoLocale = item =>
  itemSameFieldsNoLocale.reduce(
    (accum, field) => ({
      ...accum,
      [field]: getFieldContent(item, field)
    }),
    {}
  )

export const getItemSpecificFieldsNoLocale = item =>
  itemSpecificFieldsNoLocale[item.item_type].reduce(
    (accum, field) => ({
      ...accum,
      [field]: getFieldContent(item, field)
    }),
    {}
  )

/**
 * Receives item and locale (getter)
 * Returns map with all same fields for all types
 *
 * @param {Object} item
 * @param {String} locale
 * @returns {Object}
 */
export const getItemSameFields = (item, locale) =>
  itemSameFields.reduce(
    (accum, field) => ({
      ...accum,
      [field]: getFieldContent(item, field, locale)
    }),
    {}
  )

/**
 * Receives item and locale (getter)
 * Returns map with all specific to item type fields
 *
 * @param {Object} item
 * @param {String} locale
 * @returns {Object}
 */
export const getItemSpecificFields = (item, locale) => {
  const fields = itemSpecificFields[item.item_type]

  return fields.reduce(
    (accum, field) => ({
      ...accum,
      [field]: getFieldContent(item, field, locale)
    }),
    {}
  )
}

/**
 * Receives item (setter)
 * Returns map with all specific to item type fields  without locale
 *
 * @param {Object} item
 * @param {String} locale
 * @returns {Array<Object>}
 */
export const setItemSameFieldsNoLocale = item => {
  return itemSameFieldsNoLocale
    .map(field =>
      typeof item[field] === 'boolean'
        ? transformValueIntoFieldNoLocale(item[field], field)
        : item[field] && transformValueIntoFieldNoLocale(item[field], field)
    )
    .filter(field => !!field)
}

export const setItemSpecificFieldsNoLocale = item => {
  const fields = itemSpecificFieldsNoLocale[item.type]

  return fields
    .map(field => {
      if (field === FIELD_ACTIVE_DESTINATION) {
        return transformValueIntoSupplySource(item[field], field)
      } else if (typeof item[field] === 'boolean' || field === FIELD_ACCOMM_RANKING) {
        return transformValueIntoFieldNoLocale(item[field], field)
      } else {
        return (
          (item[field] || item[field] === '' || item[field] === null) &&
          transformValueIntoFieldNoLocale(item[field], field)
        )
      }
    })
    .filter(field => !!field)
}

/**
 * Receives item and locale (setter)
 * Returns map with all specific to item type fields
 *
 * @param {Object} item
 * @param {String} locale
 * @returns {Array<Object>}
 */
export const setItemSameFields = item => {
  return itemSameFields
    .map(field => item[field] && transformValueIntoField(item[field], field, item.language))
    .filter(field => !!field)
}

/**
 * Receives item and locale (setter)
 * Returns map with all specific to item type fields
 *
 * @param {Object} item
 * @param {String} locale
 * @returns {Array<Object>}
 */
export const setItemSpecificFields = item => {
  const fields = itemSpecificFields[item.type]
  return fields
    .map(field => item[field] && transformValueIntoField(item[field], field, item.language))
    .filter(field => !!field)
}

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
    const originalNameField = item.fields.find(field => field.field_name === 'original_name')
    const engField = nameFields.find(name => name.locale === 'en-GB')
    const deField = nameFields.find(name => name.locale === 'de-DE')

    return engField
      ? get(engField, 'content')
      : deField
      ? get(deField, 'content')
      : get(originalNameField, 'content')
  }
}

/**
 * Get content from item field by fieldName
 *
 * @param {Object} item
 * @param {String} fieldName
 */
export const getFieldContent = (item, fieldName, language = null) => {
  if (isArray(get(item, 'fields'))) {
    const field = language
      ? filter(get(item, 'fields'), c => c.field_name === fieldName && c.locale === language)
      : filter(get(item, 'fields'), c => c.field_name === fieldName)
    if (isEmpty(field)) return undefined
    return get(getFieldBySourcePriority(field), 'content')
    // This check is needed for ROOM TYPE
  } else if (isObject(get(item, 'fields'))) {
    const field = language
      ? filter(get(item, 'fields')[fieldName], c => c.locale === language)
      : get(item, 'fields')[fieldName][0]

    if (isEmpty(field)) return undefined

    return get(field, 'content')
  }

  return undefined
}

// Fields of item based on language (All locales)
const getItemLocales = item =>
  locales.reduce(
    (accum, locale) => ({
      ...accum,
      [locale]: {
        ...getItemSameFields(item, locale),
        ...getItemSpecificFields(item, locale),
        description: get(getDescription(item, locale), 'content'),
        descriptionInspiration: getItemDescriptionInspiration(item, locale)
      }
    }),
    {}
  )

/*
 * Returns descriptionInspiration property [{ source: 'WETU', value: 'new inspiration baby'}]
 * which is any description on the item coming from a source different than item_curator
 *
 */
const getItemDescriptionInspiration = (item, _locale) => {
  const externalSourceDescriptions = item.fields.filter(
    ({ field_name, source, locale }) =>
      field_name === FIELD_DESCRIPTION && source !== SOURCE && locale === _locale
  )

  return externalSourceDescriptions.map(({ content, source }) => ({ value: content, source }))
}

/*
 * Returns description (String) of an item based on the source and language
 *
 */
const getDescription = (item, _locale) => {
  const descriptions = item.fields.filter(
    ({ field_name, locale }) => field_name === FIELD_DESCRIPTION && locale === _locale
  )

  if (!descriptions.length) return

  return getFieldBySourcePriority(descriptions)
}
// HELPERS - END

// PARSE METHODS - START
/**
 * Receive item and returns parsed by item
 *
 * @param {Object} item
 */
export const parseItemByType = (item, language) => {
  const geolocation = getFieldContent(item, FIELD_GEOLOCATION)
  const originalName = getFieldContent(item, FIELD_ORIGINAL_NAME)

  // First fields similar for all types then specific fields for each type
  return {
    id: item.uuid,
    parentId: item.parent_uuid,
    type: item.item_type,
    original_name: originalName,
    language,
    rooms: [],
    polygon: [],
    allImages: [],
    visibleImages: [],
    geolocation: geolocation
      ? {
          lat: +geolocation.lat,
          lng: +geolocation.lon
        }
      : null,
    ...getItemSameFieldsNoLocale(item),
    ...getItemSameFields(item, language),
    ...getItemSpecificFieldsNoLocale(item),
    ...getItemSpecificFields(item, language),
    description: get(getDescription(item, language), 'content'),
    descriptionInspiration: getItemDescriptionInspiration(item, language),
    locales: getItemLocales(item)
  }
}
// PARSING METHODS - END
// PARSE FROM BE ITEM TO FE - END

// PARSE FROM FE ITEM TO BE - START
// HELPERS - START
/**
 * Transform FE value to BE field
 *
 * @param {value} value of the field
 * @param {field} item field
 * @param {language} locale
 */
const transformValueIntoField = (value, field, language = null) => ({
  field_name: field,
  content: value,
  source: SOURCE,
  source_key: SOURCE,
  locale: language
})

/**
 * Transform FE value to BE field
 *
 * @param {value} value of the field
 * @param {field} item field
 */
const transformValueIntoFieldNoLocale = (value, field) => ({
  field_name: field,
  content: value,
  source: SOURCE,
  source_key: SOURCE
})

/**
 * Transform FE value to BE field
 *
 * @param {value} value of the field
 * @param {field} item field
 */
const transformValueIntoSupplySource = (value, field) => ({
  field_name: field,
  content: !!value,
  source: SUPPLY,
  source_key: null
})
// HELPERS - END

// PARSE METHODS - START
/**
 * Receive item and returns parsed item
 *
 * @param {Object} item
 * @returns {Array}
 */
export const transformToSupplyItem = item => {
  const fields = [
    ...setItemSameFieldsNoLocale(item),
    ...setItemSameFields(item),
    ...setItemSpecificFieldsNoLocale(item),
    ...setItemSpecificFields(item)
  ]

  return fields
}

// PARSING METHODS - END
// PARSE FROM FE ITEM TO BE - START
