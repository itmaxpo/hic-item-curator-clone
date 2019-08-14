import React from 'react'
import { TitleWithContent } from '../GlobalInformation/styles'

/**
 * This is the TravelDocuments Tab component
 * Use it to render TravelDocuments tab
 *
 * @name TravelDocuments
 * @param {Object} item
 * @returns {Object} TravelDocuments Tab
 */
const TravelDocuments = ({ item }) => {
  return (
    <div>
      <TitleWithContent>
        <p> No Travel documents available yet.</p>
      </TitleWithContent>
    </div>
  )
}

export default TravelDocuments
