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
export const ROOMS_COMPONENT_NAME = 'rooms'
export const BUDGET_CATEGORY_COMPONENT_NAME = 'budget_category' //TODO: Check TRIP-17

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
export const componentsBasedOnType = type => {
  switch (type) {
    case COUNTRY_ITEM_TYPE:
      return [DESCRIPTION_COMPONENT_NAME, IMAGES_COMPONENT_NAME, INFORMATION_COMPONENT_NAME]
    case AREA_ITEM_TYPE:
      return [DESCRIPTION_COMPONENT_NAME, IMAGES_COMPONENT_NAME, LOCATION_COMPONENT_NAME]
    case ACCOMMODATION_ITEM_TYPE:
      return [
        DESCRIPTION_COMPONENT_NAME,
        BUDGET_CATEGORY_COMPONENT_NAME,
        ROOMS_COMPONENT_NAME,
        IMAGES_COMPONENT_NAME,
        LOCATION_COMPONENT_NAME
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
export const updateItemLocales = item => {
  const isFieldInLocale = field =>
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
    .map(sub => sub[0].toUpperCase() + sub.slice(1))
    .join(' ')
}
