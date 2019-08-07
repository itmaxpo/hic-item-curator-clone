import React, { useRef } from 'react'
import { compose, withProps } from 'recompose'
import { withScriptjs } from 'react-google-maps'
import { StandaloneSearchBox } from 'react-google-maps/lib/components/places/StandaloneSearchBox'
import { TextField } from '@tourlane/tourlane-ui'

/**
 * SearchBox component
 * Renders an input field to search for locations using Google Maps API
 *
 * @name SearchBox
 * @param {String} placeholder
 * @param {String} className
 * @param {Function} onChange
 * @returns {Object} SearchBox Component
 */
const SearchBox = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${process.env.REACT_APP_GOOGLE_MAP_API_KEY}`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />
  }),
  withScriptjs
)(({ onChange = () => {}, placeholder = 'Search Location', className }) => {
  const searchBoxRef = useRef(null)

  const onPlacesChangedHandler = () => {
    const newPlaces = searchBoxRef.current.getPlaces()

    onChange(newPlaces[0])
  }

  return (
    <StandaloneSearchBox
      className={className}
      ref={searchBoxRef}
      onPlacesChanged={onPlacesChangedHandler}
    >
      <TextField placeholder={placeholder} />
    </StandaloneSearchBox>
  )
})

export default SearchBox
