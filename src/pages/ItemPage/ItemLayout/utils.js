import React from 'react'
import { Base } from '@tourlane/tourlane-ui'

// Receives type and return Array<React.Component> based on it to properly render Breadcrumbs
export const generateBreadcumbs = allParents =>
  allParents.length > 1
    ? allParents.map(parent => ({
        text: parent.name,
        url: `/item/${parent.id}?language=en-GB`
      }))
    : [<Base>&nbsp;</Base>]
