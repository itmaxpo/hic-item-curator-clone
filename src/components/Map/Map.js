import React, { useState, useEffect } from 'react'
import { compose, withProps } from 'recompose'
import { isEqual, isEmpty } from 'lodash'
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  Polygon,
  StreetViewPanorama
} from 'react-google-maps'
import { initZoomControl } from './utils'
import MarkerIcon from './marker.svg'
import MapControl from './MapControl'
import InfoCard from './InfoCard'
import googleMapsStyles from './googleMapsStyles'
import './styles.css'

/**
 * Map component
 * Renders Google Map and marks the given coordinates
 *
 * If the coordinates are an array, it will render a Polygon
 *
 * @name Map
 * @param {Object/Array} coordinates
 * @param {Object} locationInfo
 * @returns {Object} Map Component
 */
const Map = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => {
  const googleMap = window.google
  const [isInfoShown, setIsInfoShown] = useState(false)

  // early return if there are no coordinates
  if (isEmpty(props.coordinates)) return

  const [coordinates, setCoordinates] = useState(props.coordinates)

  useEffect(() => {
    if (!isEqual(coordinates, props.coordinates)) {
      setCoordinates(props.coordinates)
    }
  }, [coordinates, props.coordinates])

  const center =
    coordinates.length > 1 ? coordinates[Math.round((coordinates.length - 1) / 2)] : coordinates

  return (
    <GoogleMap
      ref={map => (googleMap.current = map)}
      defaultZoom={14}
      defaultCenter={{ lng: 0, lat: 0 }}
      defaultOptions={{
        disableDefaultUI: true,
        keyboardShortcuts: false,
        styles: googleMapsStyles
      }}
      center={center}
      controlSize={20}
    >
      {props.locationInfo && isInfoShown && (
        <MapControl position={'1'}>
          <InfoCard {...props.locationInfo} />
        </MapControl>
      )}
      <MapControl position={'3'} className={`controls zoom-control`} onClick={initZoomControl}>
        <button className="zoom-control-in" title="Zoom In">
          +
        </button>
        <button className="zoom-control-out" title="Zoom Out">
          −
        </button>
      </MapControl>
      {coordinates && coordinates.length > 1 ? (
        <Polygon paths={coordinates} options={{ strokeWeight: 2 }} />
      ) : (
        <Marker
          key={1}
          position={coordinates}
          icon={{
            url: MarkerIcon,
            anchor: new window.google.maps.Point(20, 20),
            labelOrigin: new window.google.maps.Point(21, 20)
          }}
          zIndex={1000}
          label={{
            text: '1',
            color: '#FFF',
            fontFamily: 'roboto',
            fontWeight: '600'
          }}
          onClick={() => setIsInfoShown(!isInfoShown)}
        />
      )}
      <StreetViewPanorama defaultVisible={false} />
    </GoogleMap>
  )
})

export default Map
