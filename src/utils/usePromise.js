import { useEffect, useReducer } from 'react'

// TODO: move to TS
export let usePromise = (resolver, deps = []) => {
  let [data, dispatch] = useReducer(
    (data, [action, payload]) => {
      switch (action) {
        case 'load': {
          return {
            ...data,
            isLoading: true
          }
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
    },
    { isLoading: true, data: undefined, error: null }
  )

  let resolve = () => {
    dispatch(['load'])

    resolver()
      .then((data) => dispatch(['success', data]))
      .catch((e) => dispatch(['error', e]))
  }

  // deps array is responsible exactly for that
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(resolve, deps)

  return [data, resolve]
}
