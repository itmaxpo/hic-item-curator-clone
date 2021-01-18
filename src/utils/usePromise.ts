import { Reducer, useEffect, useReducer } from 'react'

interface IState<T> {
  isLoading: boolean
  data?: T
  error?: any
}

export let usePromise = <T>(
  resolver: () => Promise<T>,
  deps: any[] = []
): [IState<T>, () => void] => {
  let [data, dispatch] = useReducer<Reducer<IState<T>, [string, any?]>>(
    (state, [action, payload]) => {
      switch (action) {
        case 'load': {
          return {
            ...state,
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
