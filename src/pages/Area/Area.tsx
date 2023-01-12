import { useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'

import LoadingPage from 'pages/Loading/Loading'
import { AreaLayout } from './components/AreaLayout'
import useAreaApi from './useAreaApi'
import type { ILocale } from 'types/ILocale'

export const Area = () => {
  const { id } = useParams()
  const [urlParams] = useSearchParams()
  const locale = urlParams.get('language') as ILocale
  const [isEditing, setIsEditing] = useState(false)

  const { area, loading, polygon, updateArea } = useAreaApi(id, locale)

  return loading ? (
    <LoadingPage />
  ) : (
    <AreaLayout
      area={area}
      loading={loading}
      polygon={polygon}
      isEditing={isEditing}
      updateArea={updateArea}
      setIsEditing={setIsEditing}
      locale={locale}
    />
  )
}
