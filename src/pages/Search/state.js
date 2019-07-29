import { useReducer, useCallback, useEffect } from 'react'
import { getSearchResults } from 'services/searchApi'

const initialState = {
  results: null,
  loading: false
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'updateState':
      return {
        ...state,
        ...action.value
      }
    default:
      throw new Error()
  }
}

/**
 * @name useSearchState hook
 *
 * Keeps track of search results
 */
export const useSearchState = () => {
  const [{ results, loading }, dispatch] = useReducer(reducer, initialState)
  // const { enqueueNotification } = useNotification()

  const getResults = useCallback(
    async query => {
      try {
        const formattedResults = results.map(result => ({ score: result.score, uuid: result.uuid }))
        dispatch({
          type: 'updateState',
          value: { formattedResults, loading: false }
        })
      } catch (e) {
        console.error(e)
        dispatch({
          type: 'updateState',
          value: { results: [], loading: false }
        })
        // enqueueNotification({
        //   variant: 'error',
        //   message: 'There was an issue with the search. Please try again.'
        // })
      }
    },
    [results]
    // [results, enqueueNotification]
  )

  const getTemplate = useCallback(
    async id => {
      try {
        let { data: template } = await getSearchResults(id)

        dispatch({
          type: 'addTemplate',
          value: template,
          id: id
        })
      } catch (e) {
        console.error(e)
        dispatch({
          type: 'updateState',
          value: { loading: false }
        })
        // enqueueNotification({
        //   variant: 'error',
        //   message: 'There was an issue with the search. Please try again.'
        // })
      }
    },
    []
    // [enqueueNotification]
  )

  useEffect(() => {
    // if there are results
    if (results && results.length) {
      console.log(results)
    }
  }, [getTemplate, results])

  return {
    results,
    loading,
    getResults
  }
}
