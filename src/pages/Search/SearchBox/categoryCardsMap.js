import React from 'react'
import { World, MapPin, Home } from 'components/Icon'

export const categoryCardsMap = [
  {
    value: 'country',
    icon: () => <World />
  },
  {
    value: 'area',
    icon: () => <MapPin />
  },
  {
    value: 'accommodation',
    icon: () => <Home />
  }
]
