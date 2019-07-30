import React from 'react'
import { useAuth0 } from 'contexts/Auth/AuthProvider'
import { SearchBoxWrapper } from './styles'
/**
 * This is the Search Box component
 *
 * @name SearchBox
 * @returns {Object} Search Box
 */
const SearchBox = () => {
  const { user } = useAuth0()

  return <SearchBoxWrapper>Some stuff for {user.given_name}</SearchBoxWrapper>
}

export default SearchBox
