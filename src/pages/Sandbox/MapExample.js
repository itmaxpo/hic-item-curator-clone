import React, { useState } from 'react'
import Map, { SearchBox } from 'components/Map'

/**
 * This is an example of the Map components put together
 *
 * @name MapExample
 * @returns {Object} Map Example
 */
const MapExample = () => {
  const [coordinates, setCoordinates] = useState(null)
  const [locationInfo, setLocationInfo] = useState(null)

  const onChangeHandler = place => {
    const location = place.geometry && place.geometry.location

    const newCoordinates = {
      lat: location.lat(),
      lng: location.lng()
    }

    setCoordinates(newCoordinates)

    const newLocationInfo = {
      name: place.name,
      info: place.formatted_address
    }

    setLocationInfo(newLocationInfo)
  }

  return (
    <div>
      <SearchBox onChange={onChangeHandler} />
      <br />
      <div style={{ height: 400 }}>
        {coordinates && <Map coordinates={coordinates} locationInfo={locationInfo} />}
      </div>
    </div>
  )
}

export default MapExample
