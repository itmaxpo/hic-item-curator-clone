import { get, values, flatten } from 'lodash'

// Parse location for Map's information card
export const getLocationInfo = location => {
  const address = location.address

  const addressObject = {
    streetAndHouseNumber: `${get(address, 'road', '')} ${get(address, 'house_number', '')}`,
    postcodeAndSuburb: `${get(address, 'postcode', '')} ${get(address, 'suburb', '')}`,
    state: get(address, 'state'),
    country: get(address, 'country')
  }

  return values(addressObject)
}

// Given that OSM's display_name contains the whole address,
// the string before the first comma is the actual name of the location
export const getLocationName = location => location.label.split(',')[0]

// Parse OSM's location coordinates to feed Map
export const getLocationCoordinates = location => ({
  coordinates: { lat: Number(location.lat), lng: Number(location.lon) },
  polygon: location.geojson ? calculatePolygon(location.geojson) : null
})

// Parse geojson coordinates to feed Map
const calculatePolygon = geojson => {
  switch (geojson.type) {
    case 'Polygon':
      return parseCoordinatesArray(flatten(geojson.coordinates))
    case 'MultiPolygon':
      return parseCoordinatesArray(flatten(geojson.coordinates[0]))
    default:
      return null
  }
}

const parseCoordinatesArray = coordinates =>
  coordinates.map(coordinate => ({ lat: coordinate[1], lng: coordinate[0] }))
