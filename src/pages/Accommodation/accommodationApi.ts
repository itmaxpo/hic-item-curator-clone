import { getJson } from 'services/request'
import { AccommodationType } from 'types/Accommodation'
import * as Sentry from '@sentry/browser'

export const getAccommodationById = async (
  id: string,
  locale = 'en-GB'
): Promise<AccommodationType> => {
  let response
  try {
    response = await getJson<{ data: AccommodationType }>(
      `${process.env.REACT_APP_PARTNERS_API}/content/accommodations/${id}`,
      {
        locale
      }
    )
  } catch (e: any) {
    Sentry.captureException(e)
  }

  return response?.data as AccommodationType
}
