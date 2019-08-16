import React from 'react'
import { TitleWithContent } from '../GlobalInformation/styles'

/**
 * This is the TravelDocuments Tab component
 * Use it to render TravelDocuments tab
 *
 * @name TravelDocuments
 * @param {Object} travelDocuments
 * @param {Boolean} isEditing (isEditing mode flag)
 * @param {Function} onChange (on travelDocuments change)
 * @returns {Object} TravelDocuments Tab
 */
const TravelDocuments = ({ travelDocuments, isEditing, onChange }) => {
  return (
    <div>
      <TitleWithContent>
        <p>{travelDocuments.title}</p>
      </TitleWithContent>
    </div>
  )
}

export default TravelDocuments
