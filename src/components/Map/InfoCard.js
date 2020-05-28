import React from 'react'
import { isEmpty } from 'lodash'
import { InfoCardWrapper, Info } from './styles'

/**
 * InfoCard component
 * Renders information card, meant to use on the Map
 *
 * @name InfoCard
 * @param {String} name
 * @param {Array<String>} address
 * @param {Object} geoCoords
 * @returns {Object} InfoCard Component
 */
const InfoCard = ({ address, geoCoords }) => {
  return (
    <InfoCardWrapper className={'map-info-card'}>
      {address &&
        address.split(',').map((infoBit, index, arr) => (
          <Info key={index}>
            {infoBit.trim()}
            {index === arr.length - 1 ? '' : ','}
            <br />
          </Info>
        ))}
      {!isEmpty(geoCoords) && (
        <Info mt={10} key={geoCoords.lat}>
          {`lat: ${geoCoords.lat}`},
          <br />
          {`lng: ${geoCoords.lon ? geoCoords.lon : geoCoords.lng}`}
        </Info>
      )}
    </InfoCardWrapper>
  )
}

export default InfoCard
