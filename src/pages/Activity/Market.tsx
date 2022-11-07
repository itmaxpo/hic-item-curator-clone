import { useNavigate, useSearchParams } from 'react-router-dom'
import { stringify } from 'query-string'
import { SelectMarket } from '@tourlane/rooster'

export const useMarket = (): [string, (v: string) => void] => {
  const [urlParams] = useSearchParams()
  const language = urlParams.get('language') ?? 'en-GB'
  const navigate = useNavigate()

  return [language as string, (language: string) => navigate(`?${stringify({ language })}`)]
}

export const Market = ({ disabled }: { disabled: boolean }) => {
  let [value, set] = useMarket()

  return (
    <SelectMarket
      disabled={disabled}
      onSelect={(e, newValue) => {
        e.preventDefault()
        set(newValue)
      }}
      preSelectedMarket={value as any}
    />
  )
}
