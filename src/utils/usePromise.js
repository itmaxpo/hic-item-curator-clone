import { useEffect, useReducer } from 'react'

let initialState = { isLoading: true, data: null, error: null }

export let usePromise = (resolver, deps = []) => {
  let [data, dispatch] = useReducer((data, [action, payload]) => {
    switch (action) {
      case 'load': {
        return initialState
      }
      case 'success': {
        return {
          isLoading: false,
          data: payload
        }
      }
      case 'error': {
        return {
          isLoading: false,
          error: payload
        }
      }
      default:
        throw new Error('Wrong args.')
    }
  }, initialState)

  useEffect(() => {
    dispatch(['load'])

    resolver()
      .then(data => dispatch(['success', data]))
      .catch(e => dispatch(['error', e]))

    // deps array is responsible exactly for that
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return data
}
