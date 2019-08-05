import React from 'react'
import Layout from 'components/Layout'
import { Wrapper, CreateNewItemWrapper, CreateButton } from './styles'
import SearchBox from './SearchBox'
import SearchResultWrapper from './SearchResult'

/**
 * This is the Search Page component
 * Also it is a Home page for the app and server as '/' route
 *
 * @name SearchPage
 * @param {Object} location from route
 * @returns {Object} Search Page
 */
const SearchPage = ({ results }) => {
  const updateSelectedResults = itemsToUpdate => {
    // console.log(itemsToUpdate)
  }

  const createNewItem = () => {}

  return (
    <Layout>
      <Wrapper>
        <SearchBox />
        <SearchResultWrapper results={results} updateSelectedResults={updateSelectedResults} />

        <CreateNewItemWrapper p={0} direction={'ttb'} center alignItems={'center'}>
          <p>Didn't find what are you looking for?</p>
          <CreateButton onClick={createNewItem}>Create New Item</CreateButton>
        </CreateNewItemWrapper>
      </Wrapper>
    </Layout>
  )
}

export default SearchPage
