import { useEffect, useState } from 'react'
import * as Sentry from '@sentry/browser'
import { useNotification } from 'components/Notification'
import { flatten } from 'lodash'
import { getAreaById, AreaType, updateAreas } from './areaApi'
import { getItemPolygonCoordinatesById } from 'services/contentApi'
import { getChangedFields } from 'utils/getChangedFields'
import { mapProperties } from './util'

const useAreaApi = (id: any, locale: any) => {
  const { enqueueNotification } = useNotification()
  const [area, setArea] = useState<AreaType | null>(null)
  const [polygon, setPolygon] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const retrieveAreaData = async () => {
      await Promise.all([
        getAreaById(id as string, locale),
        getItemPolygonCoordinatesById(id as string)
      ])
        .then(async ([areaData, { data: polygonData }]) => {
          setArea(areaData)
          setPolygon(flatten(polygonData.coordinates))
          setLoading(false)
        })
        .catch((e: any) => {
          enqueueNotification({
            variant: 'error',
            message: `Failed to edit item ${e.message}`
          })
          Sentry.captureException(e)
        })
        .finally(() => setLoading(false))
    }
    retrieveAreaData().then()
  }, [enqueueNotification, id, locale])

  const updateArea = async (data: AreaType, uuid: string, dirtyFields: any) => {
    let payload = getChangedFields(dirtyFields, data, mapProperties)
    await updateAreas(uuid, locale, payload)
      .then(async () => {
        enqueueNotification({
          message: `Area updated successfully`
        })
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
  return { area, loading, polygon, updateArea }
}
export default useAreaApi
