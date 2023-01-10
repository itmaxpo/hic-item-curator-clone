import { isEmpty } from 'lodash'
import request, { postJson } from './request'
import { AccommodationType } from 'types/Accommodation'

export interface IData {
  id: string
  parent_uuid: string
  item_type: string
  fields: {
    name: string
    description: string
    blocked: string
    dmc_id: string
    external_id: string
  }
  isMerged: boolean
}
export type Meta = {
  total_count: number
  count: number
}
interface ApiResults {
  data: AccommodationType[] //IData[]
  meta: Meta
}

interface ICountry {
  uuid: string
  name: string
  iso_code: string
}

const getCountries = async (params: { name: string; geo_point?: { lat: number; lon: number } }) => {
  const { data } = await postJson<Promise<{ data: ICountry[] }>>(
    `${process.env.REACT_APP_PARTNERS_API}/content/countries/search`,
    {
      ...params
    }
  )

  return data
}

interface SearchArea {
  uuid: string
  name: string
  ancestors: { uuid: string; type: string }[]
  area_type: string
  original_name: string
  description: string
}

export const searchAreas = async (
  { name = '', country: country_uuid = '' }: { name: string; country: string },
  offset = 0,
  limit = 40
): Promise<{
  data: SearchArea[]
  meta: Meta
}> =>
  postJson(`${process.env.REACT_APP_PARTNERS_API}/content/areas/search`, {
    area_type: 'admin',
    locale: 'en-GB',
    name,
    country_uuid,
    limit,
    offset
  })

export type SearchQuery = string | string[] | null

export interface ISearchQueryAccom {
  country: string
  area: string | undefined
  name: string
  supplier: string
  provider?: SearchQuery
  missingGeolocation?: boolean
  blocked?: boolean
}

declare global {
  interface Window {
    Cypress: object
  }
}

export const searchAccommodations = async (
  {
    name = '',
    country: country_uuid = '',
    supplier: supplier_uuid,
    blocked,
    missingGeolocation: geolocation_present
  }: {
    name: string
    country: string
    supplier: string
    blocked: boolean
    missingGeolocation: boolean
  },
  offset = 0
) =>
  postJson<Promise<ApiResults>>(
    `${process.env.REACT_APP_PARTNERS_API}/content/accommodations/search`,
    {
      locale: 'en-GB',
      name,
      country_uuid,
      limit: 40,
      offset
    }
  )

/**
 * Returns activities
 *
 * @name getActivities
 * @param {Object} payload { name, supplier, country }
 * @param {Number} offset
 * @param {Number} limit
 * @returns {Object}
 */
const getActivities = async (
  { name = '', supplier = '', country = '', provider = '', active = true },
  offset = 0,
  limit = 40
) => {
  const nameToSearch = isEmpty(name) ? '' : name.toLowerCase()
  const res = await request(
    'GET',
    `${process.env.REACT_APP_PARTNERS_API}/content/activities?limit=${limit}&offset=${offset}&supplier_id=${supplier}&provider=${provider}&country_uuid=${country}&name=${nameToSearch}&active=${active}`
  )

  return res.json()
}

export { getCountries, getActivities }
