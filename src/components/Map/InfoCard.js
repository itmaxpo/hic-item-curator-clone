import React from 'react'
import { InfoCardWrapper, Name, Info } from './styles'

/**
 * InfoCard component
 * Renders information card, meant to use on the Map
 *
 * @name InfoCard
 * @param {String} name
 * @param {String} info
 * @returns {Object} InfoCard Component
 */
const InfoCard = ({ name, info }) => {
  return (
    <InfoCardWrapper>
      <Name>{name}</Name>
      {info.split(',').map((infoBit, index) => (
        <Info key={index}>{infoBit}</Info>
      ))}
    </InfoCardWrapper>
  )
}

export default InfoCard
