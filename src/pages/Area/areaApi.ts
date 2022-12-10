import { getJson } from 'services/request'
import * as Sentry from '@sentry/browser'

export interface Ancestors {
  uuid: string
  item_type: string
}

export interface AreaType {
  uuid: string
  name: string
  area_type: string
  original_name: string
  visualization_destination: boolean
  iso_code: string
  health: string | null
  safety: string | null
  electricity: string | null
  currency: string | null
  entry_requirements: string | null
  cuisine: string | null
  climate: string | null
  transport: string | null
  dress: string | null
  additional_info: string | null
  active_destination: boolean
  description: string | null
  wetu_id: string
  offer_preview: {
    title: string
    heading: string
    lead: string
    introduction: string
  }
  centroid: {
    lat: number
    lon: number
  } | null
  ancestors: Ancestors[]
}

export const getAreaById = async (id: string, locale = 'en-GB'): Promise<AreaType> => {
  let response
  try {
    response = await getJson<{ data: AreaType }>(
      `${process.env.REACT_APP_PARTNERS_API}/content/areas/${id}`,
      {
        locale
      }
    )
  } catch (e: any) {
    Sentry.captureException(e)
  }

  return response?.data as AreaType
}
