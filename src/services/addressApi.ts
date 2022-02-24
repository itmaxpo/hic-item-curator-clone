import { getJson } from './request'

export type SearchAddressParams = {
  address?: string
  lat?: number
  lon?: number
}

const searchAddress = async <Response>({ address, lat, lon }: SearchAddressParams) => {
  if (!address && !(lat && lon)) {
    return console.error(
      `Invalid search address params, address: ${address}, lat: ${lat}, lon: ${lon}`
    )
  }

  const additionalParams = 'format=json&addressdetails=1&polygon_geojson=1'

  const url = address
    ? `?${additionalParams}&limit=5&q=${address}`
    : `reverse?${additionalParams}&lat=${lat}&lon=${lon}`

  return await getJson<Response>(`${process.env.REACT_APP_OSM_SEARCH_API}/${url}`)
}

export { searchAddress }
