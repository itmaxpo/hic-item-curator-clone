// SEARCH
export const ITEMS_PER_PAGE = 20

// SOURCES
export const SOURCE = 'item_curator'
export const WETU = 'wetu'
export const SUPPLY = 'supply'
export const GIATA = 'giata'

// ITEM TYPES
export const COUNTRY_ITEM_TYPE = 'country'
export const AREA_ITEM_TYPE = 'admin_area'
export const ACCOMMODATION_ITEM_TYPE = 'accommodation'
export const TOURISTIC_AREA_ITEM_TYPE = 'touristic_area'

// Image API
export const SHUTTERSTOCK = 'shutterstock'

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
