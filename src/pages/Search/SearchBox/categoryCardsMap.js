import React from 'react'
import { WorldIcon, MapPinIcon, HomeIcon } from 'components/Icon'
import { COUNTRY_ITEM_TYPE, AREA_ITEM_TYPE, ACCOMMODATION_ITEM_TYPE } from 'pages/ItemPage/utils'

// Mapping from value to icon
export const categoryCardsMap = [
  {
    value: COUNTRY_ITEM_TYPE,
    icon: () => <WorldIcon />
  },
  {
    value: AREA_ITEM_TYPE,
    icon: () => <MapPinIcon />
  },
  {
    value: ACCOMMODATION_ITEM_TYPE,
    icon: () => <HomeIcon />
  }
]
