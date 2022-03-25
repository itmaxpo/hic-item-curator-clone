import { itemSpecificFields, itemSameFields } from './itemParser'
import { COUNTRY_ITEM_TYPE, AREA_ITEM_TYPE, ACCOMMODATION_ITEM_TYPE } from 'utils/constants'
import { isEmpty } from 'lodash'

// Item Locale Based Fields
export const localeBasedFields = ['title', 'description', 'photos']

// Components string constants for Item Page
export const DESCRIPTION_COMPONENT_NAME = 'description'
export const IMAGES_COMPONENT_NAME = 'images'
export const INFORMATION_COMPONENT_NAME = 'information'
export const LOCATION_COMPONENT_NAME = 'location'
export const PHONE_COMPONENT_NAME = 'phone'
export const ROOMS_COMPONENT_NAME = 'rooms'
export const ACCOMM_CATEGORY_COMPONENT_NAME = 'accommodation_category' //TODO: Check TRIP-17
export const CATEGORY_AND_RANKING_COMPONENT_NAME = 'category_and_ranking'
export const SOURCE = 'source'
export const COUNTRY_PAGE = 'country_page'
export const AREA_PAGE = 'area_page'

// Update item by property name
export const updateItemByProp = (item, prop, value) => ({ ...item, [prop]: value })

// Update item by global property: globalInformation/offerVisualisation/travelDocuments
export const updateItemKey = (item, globalProp, prop, value) => {
  return { ...item, [globalProp]: { ...item[globalProp], [prop]: value } }
}

// Components to render based on item.type
// Receives item.type (e.g. 'accommodation')
// Returns Array<String> based on type (should be ORDERED in the way it should be shown):
// accommodation -> ['description', 'images', 'information', 'location']
export const componentsBasedOnType = (type) => {
  switch (type) {
    case COUNTRY_ITEM_TYPE:
      return [COUNTRY_PAGE]
    case AREA_ITEM_TYPE:
      return [AREA_PAGE]
    case ACCOMMODATION_ITEM_TYPE:
      return [
        DESCRIPTION_COMPONENT_NAME,
        CATEGORY_AND_RANKING_COMPONENT_NAME,
        IMAGES_COMPONENT_NAME,
        PHONE_COMPONENT_NAME,
        LOCATION_COMPONENT_NAME,
        SOURCE
      ]
    default:
      return [DESCRIPTION_COMPONENT_NAME]
  }
}

/**
 * Update item with selected locale fields
 * Go through all locale based fields and change values
 * to currently selected language
 */
export const changeItemLocale = (item, language) => {
  return {
    ...item,
    language,
    ...item.locales[language]
  }
}

/**
 * Store current item and update selected language values
 */
export const updateItemLocales = (item) => {
  const isFieldInLocale = (field) =>
    itemSameFields.includes(field) || itemSpecificFields[item.type].includes(field)

  const locale = Object.keys(item).reduce(
    (accum, field) => (isFieldInLocale(field) ? { ...accum, [field]: item[field] } : accum),
    {}
  )

  return {
    ...item.locales,
    [item.language]: locale
  }
}

export const capitalizeBy = (str = '', separator = '_') => {
  if (isEmpty(str)) return ''

  return str
    .split(separator)
    .map((sub) => sub[0].toUpperCase() + sub.slice(1))
    .join(' ')
}
