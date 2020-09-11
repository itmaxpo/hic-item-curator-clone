import { useRef, useCallback } from 'react'

import { FIELD_FRONT_DESK_PHONE } from './itemParser'
import { parsePhoneNumber } from './OfferVisualisation/utils'

export const useFieldsRef = item => {
  const rankingRef = useRef(item.ranking)
  const blockedRef = useRef(item.blocked)
  const categoryRef = useRef(item.accommodation_category)

  // create a function to update ref
  const updateFieldRef = useCallback(item => {
    rankingRef.current = item.ranking
    blockedRef.current = item.blocked
    categoryRef.current = item.accommodation_category
  }, [])

  const cleanFields = useCallback((fields, item, phoneTouched) => {
    let newFields = fields
    // if the ref is falsy, that means Elephant doesn't have this field
    // Dont save a null value to an non existant field in Elephant
    // else it causes error
    if (!item.ranking && !rankingRef.current) {
      newFields = fields.filter(field => field.field_name !== 'ranking')
    }
    if (!item.blocked && !blockedRef.current) {
      newFields = newFields.filter(field => {
        return field.field_name !== 'blocked'
      })
    }
    if (!item.accommodation_category && !categoryRef.current) {
      newFields = newFields.filter(field => {
        return field.field_name !== 'accommodation_category'
      })
    }

    const { content } = fields.find(({ field_name }) => field_name === FIELD_FRONT_DESK_PHONE)
    const { isValid: isPhoneNumberValid } = parsePhoneNumber(content)

    if (!isPhoneNumberValid && !phoneTouched) {
      newFields = newFields.filter(field => {
        return field.field_name !== FIELD_FRONT_DESK_PHONE
      })
    }

    return newFields
  }, [])

  return { updateFieldRef, cleanFields }
}
