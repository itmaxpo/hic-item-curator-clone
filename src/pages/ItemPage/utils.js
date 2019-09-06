import {
  parseCountryItem,
  parseAccommodationItem,
  parseAreaItem,
  transformCountryItem,
  transformAccommodationItem,
  transformAreaItem
} from './itemParser'

// Item Type Constants
export const COUNTRY_ITEM_TYPE = 'country'
export const AREA_ITEM_TYPE = 'admin_area'
export const ACCOMMODATION_ITEM_TYPE = 'accommodation'

// Components string constants for Item Page
export const DESCRIPTION_COMPONENT_NAME = 'description'
export const IMAGES_COMPONENT_NAME = 'images'
export const INFORMATION_COMPONENT_NAME = 'information'
export const LOCATION_COMPONENT_NAME = 'location'
export const ROOMS_COMPONENT_NAME = 'rooms'

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
        ROOMS_COMPONENT_NAME,
        IMAGES_COMPONENT_NAME,
        LOCATION_COMPONENT_NAME
      ]
    default:
      return [DESCRIPTION_COMPONENT_NAME]
  }
}

/**
 * Receive item and additional fields and returns item
 *
 * @param {Object} item
 * @returns {Object} Item parsed
 */
export const parseItemByType = item => {
  switch (item.item_type) {
    case COUNTRY_ITEM_TYPE:
      return parseCountryItem(item)
    case AREA_ITEM_TYPE:
      return parseAreaItem(item)
    case ACCOMMODATION_ITEM_TYPE:
      return parseAccommodationItem(item)
    default:
      return null
  }
}

/**
 * Receive item and transforms item to BE compatible version
 *
 * @param {Object} item
 * @param {Array<Room>} accomRooms
 * @param {Array<Coord>} areaCoords
 * @returns {Object} Item
 */
export const transformToSupplyItem = item => {
  switch (item.type) {
    case COUNTRY_ITEM_TYPE:
      return transformCountryItem(item)
    case AREA_ITEM_TYPE:
      return transformAreaItem(item)
    case ACCOMMODATION_ITEM_TYPE:
      return transformAccommodationItem(item)
    default:
  }
}
