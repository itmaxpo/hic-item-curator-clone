import { useRef, useCallback } from 'react'

export const useFieldsRef = () => {
  const rankingRef = useRef(undefined)
  const blacklistedRef = useRef(undefined)
  const categoryRef = useRef(undefined)

  // create a function to update ref
  const updateFieldRef = useCallback(item => {
    rankingRef.current = item.rankingRef
    blacklistedRef.current = item.blacklistedRef
    categoryRef.current = item.blacklistedRef
  }, [])

  const cleanFields = useCallback((fields, item) => {
    console.log('fields', fields)
    let newFields = fields
    // if the ref is falsy, that means Elephant doesn't have this field
    // Don't save a falsy field to an non existant field in Elephant
    // else it causes error
    if (!item.ranking && !rankingRef.current) {
      newFields = fields.filter(field => field.field_name !== 'ranking')
    }
    if (!item.blacklisted && !blacklistedRef.current) {
      newFields = newFields.filter(field => {
        return field.field_name !== 'blacklisted'
      })
    }
    if (!item.accommodation_category && !categoryRef.current) {
      newFields = newFields.filter(field => {
        return field.field_name !== 'accommodation_category'
      })
    }
    return newFields
  }, [])

  return { updateFieldRef, cleanFields }
}
