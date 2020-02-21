import React, { useState, useEffect } from 'react'
import { isEmpty } from 'lodash'
import { Map as TuiMap, MapMarker, MapPolygon } from '@tourlane/tourlane-ui'
import InfoCard from './InfoCard'

const BoundsProvider = ({ children, paths }) => {
  const [map, setMap] = useState(null)

  useEffect(() => {
    if (!paths) return
    if (map) {
      const bounds = new window.google.maps.LatLngBounds()
      paths.forEach(path => path.forEach(point => bounds.extend(point)))
      // Fit map to bounds calculated from passed down 'paths' prop
      map.fitBounds(bounds)
    }
  }, [map, paths])

  return children({ setMap })
}

const Map = ({ coordinates, polygon, locationInfo, ...rest }) => (
  <TuiMap
    apiKey={process.env.REACT_APP_GOOGLE_MAP_API_KEY}
    center={isEmpty(polygon) ? coordinates : undefined}
    renderLeftTopControl={() => locationInfo && <InfoCard {...locationInfo} />}
    zoom={isEmpty(polygon) ? 14 : undefined}
    defaultOptions={{
      scrollwheel: false
    }}
    {...rest}
  >
    {isEmpty(polygon) && <MapMarker position={coordinates} type="marker" zIndex={100} />}
    {polygon && <MapPolygon paths={polygon} zIndex={100} />}
  </TuiMap>
)

const MapWrapper = props => (
  <BoundsProvider paths={props.polygon}>
    {({ setMap }) => <Map onMapChange={setMap} {...props} />}
  </BoundsProvider>
)

export default MapWrapper
