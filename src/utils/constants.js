// SEARCH
export const ITEMS_PER_PAGE = 40

// SOURCES
export const SOURCE = 'item_curator'
export const WETU = 'wetu'
export const SUPPLY = 'supply'
export const GIATA = 'giata'

// ITEM TYPES
export const COUNTRY_ITEM_TYPE = 'country'
export const COUNTRY_UPDATED_ITEM_TYPE = 'country_update'
export const AREA_ITEM_TYPE = 'admin_area'
export const ACCOMMODATION_ITEM_TYPE = 'accommodation'
export const ACTIVITY_ITEM_TYPE = 'activity'
export const TOURISTIC_AREA_ITEM_TYPE = 'touristic_area'

// Image API
export const SHUTTERSTOCK = 'shutterstock'
export const LONELY_PLANET = 'lonely_planet'
export const ISTOCK_PHOTO = 'istockphoto'
export const UNSPLASH = 'unsplash'
export const DMC = 'dmc'
export const SUPPLY_WEBSITE = 'supply_website'

export const IMAGE_DRAG_N_DROP_TEXT = 'Please drag & drop images here \n or browse files'
export const IMAGE_SEARCH_TEXT = 'Please use search to find images'

// Tourlane Markets - will be an endpoint in the future
export const MARKETS_FLAGS = {
  'tourlane.co.uk': 'GB',
  'tourlane.de': 'DE',
  'tourlane.nl': 'NL',
  'tourlane.fr': 'FR',
  'tourlane.com': 'US'
}

export const MARKETS = Object.keys(MARKETS_FLAGS)

export const BLOCKED_REASONS = [
  'We do not want to sell this accommodation',
  'Temporarily not possible to sell this accommodation'
]

export const formSpacing = [12, 12, 15, 18, 24]
