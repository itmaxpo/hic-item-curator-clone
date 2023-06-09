import React from 'react'
import { FlagIcon, MapPinIcon, HomeIcon, BeachIcon } from 'components/Icon'
import {
  COUNTRY_ITEM_TYPE,
  AREA_ITEM_TYPE,
  ACCOMMODATION_ITEM_TYPE,
  ACTIVITY_ITEM_TYPE
} from 'utils/constants'

// Mapping from value to icon
export const categoryCardsMap = [
  {
    value: COUNTRY_ITEM_TYPE,
    displayName: 'Country',
    icon: () => <FlagIcon />
  },
  {
    value: AREA_ITEM_TYPE,
    displayName: 'Area',
    icon: () => <MapPinIcon />
  },
  {
    value: ACCOMMODATION_ITEM_TYPE,
    displayName: 'Accommodation',
    icon: () => <HomeIcon />
  },
  {
    value: ACTIVITY_ITEM_TYPE,
    displayName: 'Activity',
    icon: () => <BeachIcon />
  }
]
