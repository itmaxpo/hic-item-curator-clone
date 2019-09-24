import React from 'react'
import { Base } from '@tourlane/tourlane-ui'

// Mocked languages
export const customMarkets = {
  Deutsch: 'de-DE',
  'English (US)': 'en-US',
  'English (UK)': 'en-GB',
  Nederlands: 'nl-NL',
  Français: 'fr-FR',
  España: 'es-ES'
}
// Receives type and return Array<React.Component> based on it to properly render Breadcrumbs
export const generateBreadcumbs = allParents =>
  allParents.length > 0
    ? allParents.map(parent => ({
        text: parent.name,
        url: `/item/${parent.id}?language=en-GB`
      }))
    : [<Base>&nbsp;</Base>]
