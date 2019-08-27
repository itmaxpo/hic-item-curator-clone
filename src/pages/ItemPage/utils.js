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

// Global Item properties
export const OFFER_VISUALISATION_ITEM_PROP = 'offerVisualisation'
export const TRAVEL_DOCUMENTS_ITEM_PROP = 'travelDocuments'

// Update item by property name
export const updateItemByProp = (item, prop, value) => {
  return { ...item, [prop]: value }
}

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

// Mocked item to play with
export const mockedItem = {
  id: '123',
  title: 'Arakur Ushuaia & Resort',
  subtitle: 'Malvinas, Ushuaia, Argentina',
  status: 'inProgress',
  type: ACCOMMODATION_ITEM_TYPE,
  language: 'DE',
  suppliers: [1, 2],
  [OFFER_VISUALISATION_ITEM_PROP]: {
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
    location: {
      lat: 50.4520886,
      lng: 30.590911000000006,
      name: 'Some address',
      info: 'Some description'
    },
    rooms: [
      { type: 'Queen Room', mealbase: 'MB INFO', description: 'Some stuff about queens' },
      { type: 'King Room', mealbase: 'MB INFO', description: 'Some stuff about kings' },
      { type: 'Prince Room', mealbase: '', description: 'Some stuff about princs' }
    ],
    photos: [
      {
        isLoading: false,
        isError: false,
        isSelected: false,
        isVisible: false,
        value: 'https://loremflickr.com/320/240/travel'
      },
      {
        isLoading: false,
        isError: false,
        isSelected: false,
        isVisible: false,
        value: 'https://loremflickr.com/320/240/man'
      },
      {
        isLoading: false,
        isError: false,
        isSelected: false,
        isVisible: false,
        value: 'https://loremflickr.com/320/240/woman'
      },
      {
        isLoading: false,
        isError: false,
        isSelected: false,
        isVisible: true,
        value: 'https://loremflickr.com/320/240/dance'
      },
      {
        isLoading: false,
        isError: false,
        isSelected: false,
        isVisible: true,
        value: 'https://loremflickr.com/320/240/house'
      },
      {
        isLoading: false,
        isError: false,
        isSelected: false,
        isVisible: true,
        value: 'https://loremflickr.com/320/240/nature'
      },
      {
        isLoading: false,
        isError: false,
        isSelected: false,
        isVisible: true,
        value: 'https://loremflickr.com/320/240/sea'
      },
      {
        isLoading: false,
        isError: false,
        isSelected: false,
        isVisible: true,
        value: 'https://loremflickr.com/320/240/dance'
      },
      {
        isLoading: false,
        isError: false,
        isSelected: false,
        isVisible: true,
        value: 'https://loremflickr.com/320/240/house'
      },
      {
        isLoading: false,
        isError: false,
        isSelected: false,
        isVisible: true,
        value: 'https://loremflickr.com/320/240/nature'
      },
      {
        isLoading: false,
        isError: false,
        isSelected: false,
        isVisible: true,
        value: 'https://loremflickr.com/320/240/sea'
      },
      {
        isLoading: false,
        isError: false,
        isSelected: false,
        isVisible: true,
        value: 'https://loremflickr.com/320/240/dance'
      },
      {
        isLoading: false,
        isError: false,
        isSelected: false,
        isVisible: true,
        value: 'https://loremflickr.com/320/240/house'
      },
      {
        isLoading: false,
        isError: false,
        isSelected: false,
        isVisible: true,
        value: 'https://loremflickr.com/320/240/nature'
      },
      {
        isLoading: false,
        isError: false,
        isSelected: false,
        isVisible: true,
        value: 'https://loremflickr.com/320/240/sea'
      }
    ]
  },
  [TRAVEL_DOCUMENTS_ITEM_PROP]: {
    title: 'Travel documents are not available yet'
  }
}
