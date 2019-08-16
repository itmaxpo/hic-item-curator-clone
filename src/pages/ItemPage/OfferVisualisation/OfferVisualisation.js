import React from 'react'
import { TitleWithContent } from '../GlobalInformation/styles'

/**
 * This is the OfferVisualisation Tab component
 * Use it to render OfferVisualisation tab
 *
 * @name OfferVisualisation
 * @param {Object} offerVisualisation
 * @param {Boolean} isEditing (isEditing mode flag)
 * @param {Function} onChange (on offerVisualisation change)
 * @returns {Object} OfferVisualisation Tab
 */
const OfferVisualisation = ({ offerVisualisation, isEditing, onChange }) => {
  return (
    <div>
      <TitleWithContent>
        <p>{offerVisualisation.title}</p>
      </TitleWithContent>
    </div>
  )
}

export default OfferVisualisation
