import React from 'react'
import { InfoCardWrapper, Name, Info } from './styles'

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
const InfoCard = ({ name, address, geoCoords }) => {
  return (
    <InfoCardWrapper>
      <Name>{name}</Name>
      {address.map((infoBit, index) => (
        <Info key={index}>{infoBit}</Info>
      ))}
      <Info
        style={{ marginTop: 10 }}
        key={geoCoords.lat}
      >{`lat: ${geoCoords.lat}, lng: ${geoCoords.lng}`}</Info>
    </InfoCardWrapper>
  )
}

export default InfoCard
