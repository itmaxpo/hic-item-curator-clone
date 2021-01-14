import { useHistory } from 'react-router-dom'
import { parse, stringify } from 'query-string'
import { SelectMarket } from '@tourlane/rooster'

export const useMarket = (): [string, (v: string) => void] => {
  let history = useHistory()
  let { language } = parse(history.location.search)

  return [language as string, (language: string) => history.push(`?${stringify({ language })}`)]
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
