import { useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'

import LoadingPage from 'pages/Loading/Loading'
import type { ILocale } from 'types/ILocale'
import { CountryLayout } from './CountryLayout'
import { useCountry } from './useCountry'
import { CountryType } from 'types/Country'

export const Country = () => {
  const { id } = useParams()
  const [urlParams] = useSearchParams()
  const locale = urlParams.get('language') as ILocale
  const [isEditing, setIsEditing] = useState(false)

  const { country, loading, updateCountry } = useCountry(id as string, locale)

  return loading ? (
    <LoadingPage />
  ) : (
    <CountryLayout
      country={country as CountryType}
      isEditing={isEditing}
      updateCountry={updateCountry}
      setIsEditing={setIsEditing}
      locale={locale}
    />
  )
}
