import { useEffect, useState } from 'react'
import * as Sentry from '@sentry/browser'

import { useNotification } from 'components/Notification'
import { getCountryById, CountryUpdate, updateCountry } from './coutryApi'
import { getChangedFields } from 'utils/getChangedFields'
import { CountryType } from 'types/Country'
import { ILocale } from 'types/ILocale'

export const useCountry = (id: string, locale: ILocale) => {
  const { enqueueNotification } = useNotification()
  const [country, setCountry] = useState<CountryType | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const retrieveAreaData = async () => {
      await getCountryById(id as string, locale)
        .then(async (data) => {
          setCountry(data)
          setLoading(false)
        })
        .catch((e: any) => {
          enqueueNotification({
            variant: 'error',
            message: `Failed to edit country, ${e.message}`
          })
          Sentry.captureException(e)
        })
        .finally(() => setLoading(false))
    }
    retrieveAreaData().then()
  }, [enqueueNotification, id, locale])

  const updateCountryForm = async (
    data: CountryType,
    locale: ILocale,
    uuid: string,
    dirtyFields: any
  ) => {
    await updateCountry(
      uuid,
      locale,
      getChangedFields(dirtyFields, data, [
        'additional_info',
        'description',
        'currency',
        'transport',
        'cuisine',
        'climate',
        'dress',
        'electricity',
        'safety',
        'health',
        'entry_requirements'
      ]) as CountryUpdate
    )
      .then(async (response) => {
        enqueueNotification({
          message: `Country updated successfully`
        })

        setCountry(response)
      })
      .catch((error: any) => {
        enqueueNotification({
          variant: 'error',
          message: `${error[0]}`
        })
        if (error instanceof Error) {
          console.error(error)
        }
        Sentry.captureException(error[0])
      })
  }
  return { country, loading, updateCountry: updateCountryForm }
}
