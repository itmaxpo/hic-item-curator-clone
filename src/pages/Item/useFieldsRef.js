import { useRef, useCallback } from 'react'

export const useFieldsRef = item => {
  const rankingRef = useRef(item.ranking)
  const blacklistedRef = useRef(item.blacklisted)
  const categoryRef = useRef(item.accommodation_category)

  // create a function to update ref
  const updateFieldRef = useCallback(item => {
    rankingRef.current = item.ranking
    blacklistedRef.current = item.blacklisted
    categoryRef.current = item.accommodation_category
  }, [])

  const cleanFields = useCallback((fields, item) => {
    let newFields = fields
    // if the ref is falsy, that means Elephant doesn't have this field
    // Don't save a null value to an non existant field in Elephant
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