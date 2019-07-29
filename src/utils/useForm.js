import { useCallback, useReducer, useRef } from 'react'

const reducer = (state, action) => {
  switch (action.type) {
    case 'updateField':
      return {
        ...state,
        [action.payload.fieldName]: action.payload.value
      }
    case 'updateFields':
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}

/**
 * useForm hook
 *
 * Handles the state of a form.
 *
 * Optionally accepts an initial state and a validator function.
 *
 * @name useForm hook
 * @returns the current form 'state'.
 * @returns an 'updateFields' function to update one or more fields in the state.
 * @returns a 'fields' object containing (for every field), the current state and an updater.
 * @returns a 'isDirty' flag, which shows if any field has changed.
 * @returns a 'isValid' flag, which shows if the validator function returned true.
 */
export default function useForm(initialState, validator) {
  const [state, dispatch] = useReducer(reducer, initialState || {})

  // keep track of the initial state, as received on mount
  const initialStateRef = useRef(initialState)

  const updateInitialValue = value => {
    initialStateRef.current = value
  }

  const updateField = (fieldName, value) => {
    dispatch({
      type: 'updateField',
      payload: { fieldName, value }
    })
  }

  const updateFields = useCallback(newState => {
    dispatch({
      type: 'updateFields',
      payload: newState
    })
  }, [])

  const fields = Object.keys(initialStateRef.current).reduce((result, fieldName) => {
    const currentFieldState = state[fieldName]
    const updaterFunction = value => {
      updateField(fieldName, value)
    }

    result[fieldName] = [currentFieldState, updaterFunction]
    return result
  }, {})

  const errors = validator ? validator(state) : {}

  // isDirty is true if any of the fields is different from the initial state
  const isDirty = Object.keys(initialStateRef.current).some(fieldName => {
    const fieldChanged = initialStateRef.current[fieldName] !== state[fieldName]
    return fieldChanged
  })

  return { state, updateFields, fields, errors, isDirty, dispatch, updateInitialValue }
}
