import React from 'react'
import { Base } from '@tourlane/tourlane-ui'

// Mocked languages
export const flagEmoji = [
  { label: 'DE 🇩🇪', value: 'de-DE' },
  { label: 'EN 🇬🇧', value: 'en-GB' },
  { label: 'FR 🇫🇷', value: 'fr-FR' },
  { label: 'USA 🇺🇸', value: 'en-US' },
  // { label: 'ES 🇪🇸', value: 'es-ES' },
  { label: 'NL 🇳🇱', value: 'nl-NL' }
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
export const generateBreadcumbs = allParents =>
  allParents.length > 0
    ? allParents.map(parent => ({
        text: parent.name,
        url: `/item/${parent.id}?language=en-GB`
      }))
    : [<Base>&nbsp;</Base>]
