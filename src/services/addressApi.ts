import request from './request'

/**
 * Returns addresses
 *
 * @name searchAddress
 * @param {String} name
 * @returns {Object}
 */
const searchAddress = async (address: string) => {
  let res = await request(
    'GET',
    `${process.env.REACT_APP_OSM_SEARCH_API}/?format=json&limit=5&addressdetails=1&polygon_geojson=1&q=${address}`
  )

  return res.json()
}

export { searchAddress }
