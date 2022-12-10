import type { ILocale } from 'types/ILocale'
import { getJson, postJson } from 'services/request'
export interface Area {
  area_type: 'touristic' | 'admin'
  original_name: string
  name: string
  uuid: string
}

export const getAreasById = (payload: {
  area_uuids: string[]
  locale: ILocale
}): Promise<{ data: Area[] }> =>
  postJson(`${process.env.REACT_APP_PARTNERS_API}/content/areas/search`, payload)

export const getCountry = (
  uuid: string
): Promise<{ data: { original_name: string; uuid: string; name: string; area_type: null } }> =>
  getJson(`${process.env.REACT_APP_PARTNERS_API}/content/countries/${uuid}`)
