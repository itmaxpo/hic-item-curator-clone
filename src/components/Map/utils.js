import Geocode from 'react-geocode'
import { get } from 'lodash'

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAP_API_KEY)

export const fetchCoords = async location => {
  try {
    const response = await Geocode.fromAddress(location)
    const { lat, lng } = get(response, 'results[0].geometry.location')

    return {
      lat,
      lng
    }
  } catch (e) {
    console.error(e)
  }
}

/** NOTE: The following code is based on the Google Maps documentation. 
Source: https://developers.google.com/maps/documentation/javascript/examples/control-replacement **/

export function initZoomControl(map) {
  document.querySelector('.zoom-control-in').onclick = function() {
    map.setZoom(map.getZoom() + 1)
  }
  document.querySelector('.zoom-control-out').onclick = function() {
    map.setZoom(map.getZoom() - 1)
  }
}
