import { useRef, useCallback } from 'react'

export const useFieldsRef = () => {
  const rankingRef = useRef(undefined)
  const blacklistedRef = useRef(undefined)

  // create a function to update ref
  const updateFieldRef = useCallback(item => {
    rankingRef.current = item.rankingRef
    blacklistedRef.current = item.blacklistedRef
  }, [])

  const cleanFields = useCallback((fields, item) => {
    let newFields
    if (!item.ranking && !rankingRef.current) {
      newFields = fields.filter(field => field.field_name !== 'ranking')
    }
    if (!item.blacklisted && !blacklistedRef.current) {
      newFields = newFields.filter(field => field.field_name !== 'blacklisted')
    }
    return newFields
  }, [])

  return { updateFieldRef, cleanFields }
}
