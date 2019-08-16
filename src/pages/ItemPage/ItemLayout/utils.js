import React from 'react'
import { COUNTRY_ITEM_TYPE, AREA_ITEM_TYPE, ACCOMMODATION_ITEM_TYPE } from 'pages/ItemPage/utils'
import { Base } from '@tourlane/tourlane-ui'

// Mocked languages
export const flagEmoji = [
  { label: '🇩🇪', value: 'DE' },
  { label: '🇬🇧', value: 'EN_UK' },
  { label: '🇫🇷', value: 'FR' },
  { label: '🇺🇸', value: 'EN_US' }
]
// Mocked suppliers
export const suppliers = [
  { value: 1, label: 'First' },
  { value: 2, label: 'Second' },
  { value: 3, label: 'Third' },
  { value: 4, label: 'Fourth' },
  { value: 5, label: 'Fifth' }
]
// Receives type and return Array<React.Component> based on it to properly render Breadcrumbs
export const generateBreadcumbs = (item, onBreadcrumbClick) => {
  switch (item.type) {
    case AREA_ITEM_TYPE:
      return [
        <Base onClick={() => onBreadcrumbClick(item.country, COUNTRY_ITEM_TYPE)}>
          {item.country || 'Australia'}
        </Base>,
        <Base onClick={() => onBreadcrumbClick(item.area, AREA_ITEM_TYPE)}>
          {item.area || 'Ushuaya'}
        </Base>
      ]
    case ACCOMMODATION_ITEM_TYPE:
      return [
        <Base onClick={() => onBreadcrumbClick(item.country, COUNTRY_ITEM_TYPE)}>
          {item.country || 'Australia'}
        </Base>,
        <Base onClick={() => onBreadcrumbClick(item.area, AREA_ITEM_TYPE)}>
          {item.area || 'Ushuaya'}
        </Base>,
        <Base onClick={() => onBreadcrumbClick(item.area, ACCOMMODATION_ITEM_TYPE)}>
          {item.accommodation || 'Accommodation'}
        </Base>
      ]
    // When item is country - reserves some space for Breadcrumbs
    default:
      return [<Base>&nbsp;</Base>]
  }
}
