import { getJson } from 'services/request'
import * as Sentry from '@sentry/browser'
import { CountryType } from '../../types/Country'

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
