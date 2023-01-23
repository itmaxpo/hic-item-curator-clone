import { getJson, patchJson } from 'services/request'
import * as Sentry from '@sentry/browser'
import { CountryType, Information } from 'types/Country'

export const getCountryById = async (id: string, locale = 'en-GB'): Promise<CountryType> => {
  let response
  try {
    response = await getJson<{ data: CountryType }>(
      `${process.env.REACT_APP_PARTNERS_API}/content/countries/${id}`,
      {
        locale
      }
    )
  } catch (e: any) {
    Sentry.captureException(e)
  }

  return response?.data as CountryType
}

export interface CountryUpdate extends Information {
  uuid: string
  name: string

  offer_preview: {
    lead: string
    title: string
    heading: string
    introduction: string
  }
  description: string
}

export const updateCountry = async (uuid: string, locale: string, payload: CountryUpdate) => {
  let res = await patchJson<{ data: CountryType }, { country: any }>(
    `${process.env.REACT_APP_PARTNERS_API}/content/countries/${uuid}?locale=${locale}`,
    {
      country: {
        ...payload
      }
    },
    'application/json'
  )
  return res?.data as CountryType
}
