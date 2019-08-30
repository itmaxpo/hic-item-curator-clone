import { get } from 'lodash'

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

export const parseSearchBoxResponse = data =>
  data.map(address => ({
    label: get(address, 'display_name'),
    value: get(address, 'display_name'),
    ...address
  }))
