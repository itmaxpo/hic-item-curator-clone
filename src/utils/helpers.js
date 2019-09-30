import { SOURCE, WETU, SUPPLY } from './constants'

/*
 * We prioritize fields by it's source:
 * 1) Item curator
 * 2) WETU
 * 3) Anything else
 */
export const getFieldBySourcePriority = field => {
  const sourcePriorityOrder = [SOURCE, WETU, SUPPLY]

  for (let key of sourcePriorityOrder) {
    const foundKey = field.find(({ source }) => source.toLowerCase() === key)
    if (foundKey) {
      return foundKey
    }
  }
  return field[0]
}
