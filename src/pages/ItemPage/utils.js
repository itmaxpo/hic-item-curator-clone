// Item Type Constants
export const COUNTRY_ITEM_TYPE = 'country'
export const AREA_ITEM_TYPE = 'area'
export const ACCOMMODATION_ITEM_TYPE = 'accommodation'

// Components string constants for Item Page
export const DESCRIPTION_COMPONENT_NAME = 'description'
export const IMAGES_COMPONENT_NAME = 'images'
export const INFORMATION_COMPONENT_NAME = 'information'
export const LOCATION_COMPONENT_NAME = 'location'
export const ROOMS_COMPONENT_NAME = 'rooms'

// Update item by property name
export const updateItemByProp = (item, prop, value) => {
  return { ...item, [prop]: value }
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

// Mocked item to play with
export const mockedItem = {
  title: 'Arakur Ushuaia Resort',
  subtitle: 'Malvinas, Ushuaia, Argentina',
  description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
    reprehenderit in voluptate velit esse cillum dolore eu fugiat 
    nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
    sunt in culpa qui officia <ul><li>1</li><li>2</li></ul>deserunt mollit anim id est laborum.
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
    reprehenderit in voluptate velit esse cillum dolore eu fugiat 
    nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
    sunt in culpa qui officia deserunt mollit anim id est laborum.
    <b>Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
    reprehenderit in voluptate velit esse cillum dolore eu fugiat 
    nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
    sunt in culpa qui officia deserunt mollit anim id est laborum.</b>
    <b>Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
    reprehenderit in voluptate velit esse cillum dolore eu fugiat 
    nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
    sunt in culpa qui officia deserunt mollit anim id est laborum.</b>
    <b>Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
    reprehenderit in voluptate velit esse cillum dolore eu fugiat 
    nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
    sunt in culpa qui officia deserunt mollit anim id est laborum.</b>
    <b>Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in 
    reprehenderit in voluptate velit esse cillum dolore eu fugiat 
    nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
    sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  status: 'inProgress',
  type: ACCOMMODATION_ITEM_TYPE,
  language: 'DE',
  suppliers: [1, 2],
  rooms: [
    { title: 'Queen Room', description: 'Some stuff about queens' },
    { title: 'King Room', description: 'Some stuff about kings' },
    { title: 'Prince Room', description: 'Some stuff about princs' }
  ],
  photos: [
    'https://loremflickr.com/320/240/travel',
    'https://loremflickr.com/320/240/travel',
    'https://loremflickr.com/320/240/travel',
    'https://loremflickr.com/320/240/travel',
    'https://loremflickr.com/320/240/travel',
    'https://loremflickr.com/320/240/travel',
    'https://loremflickr.com/320/240/travel',
    'https://loremflickr.com/320/240/dance'
  ]
}
