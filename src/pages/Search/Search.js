import React from 'react'
import Layout from 'components/Layout'
import { Wrapper } from './styles'
import SearchBox from './SearchBox'
import SearchResult from './SearchResult'

/**
 * This is the Search Page component
 * Also it is a Home page for the app and server as '/' route
 *
 * @name SearchPage
 * @param {Object} location from route
 * @returns {Object} Search Page
 */
const SearchPage = () => {
  return (
    <Layout>
      <Wrapper>
        <SearchBox />
        <SearchResult />
      </Wrapper>
    </Layout>
  )
}

export default SearchPage
