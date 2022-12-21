import { getJson, patchJson } from 'services/request'

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
export interface AreaTypePayload {
  name_item_curator?: string
  visualization_destination?: boolean
  health_item_curator?: string
  safety_item_curator?: string
  electricity_item_curator?: string
  currency_item_curator?: string
  entry_requirements_item_curator?: string
  cuisine_item_curator?: string
  climate_item_curator?: string
  transport_item_curator?: string
  dress_item_curator?: string
  additional_info_item_curator?: string
  active_destination?: boolean
  description_item_curator?: string
  offer_preview?: {
    title: string
    heading: string
    lead: string
    introduction: string
  }
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

export const updateAreas = async (uuid: string, locale: string, payload: AreaTypePayload) => {
  let res = await patchJson<{ data: AreaType }, { area: AreaTypePayload }>(
    `${process.env.REACT_APP_PARTNERS_API}/content/areas/${uuid}?locale=${locale}`,
    {
      area: {
        ...payload
      }
    },
    'application/json'
  )
  return res?.data as AreaType
}
