import React, { createContext, useMemo } from 'react'

const SearchPageContext = createContext({
  areResultsReady: false
})

const { Provider } = SearchPageContext

/**
 * Handles search results
 *
 * @name SearchPageProvider
 * @param {Function} onRequestSearchResults
 */
const SearchPageProvider = ({ children, onRequestSearchResults }) => {
  const contextValue = useMemo(
    () => ({
      areResultsready: false,
      onRequestSearchResults
    }),
    [onRequestSearchResults]
  )

  return <Provider value={contextValue}>{children}</Provider>
}

export default SearchPageContext
export { SearchPageProvider }
