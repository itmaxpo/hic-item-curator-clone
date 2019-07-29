import React from 'react'
import Layout from 'components/Layout'
import { useAuth0 } from 'contexts/Auth/AuthProvider'
import { NotificationProvider } from 'components/Notification'
import { SearchPageProvider } from 'contexts/Search/SearchContext'
import { getSearchResultsPayload, validator } from './utils'
import { getSearchResults } from 'services/searchApi'
import useForm from 'utils/useForm'
import { useSearchState } from './state'

/**
 * This is function that will create initial state
 * for the form used on Search page
 *
 * @name createInitialFormState
 * @returns {Object} state
 */
const createInitialFormState = ({ name }) => ({
  name
})

/**
 * This is the Search Page component
 * Also it is a Home page for the app and server as '/' route
 *
 * @name SearchPage
 * @param {Object} location from route
 * @returns {Object} Search Page
 */
const SearchPage = () => {
  const { results } = useSearchState()
  console.log(results)
  const { user } = useAuth0()
  const { state } = useForm(createInitialFormState({ name: user.given_name }), validator)

  const requestSearchResulsHandler = async requestResultsPayload => {
    const { url } = await getSearchResults(
      getSearchResultsPayload({ ...state }, requestResultsPayload)
    )
    console.log(url)
  }

  return (
    <NotificationProvider>
      <SearchPageProvider onRequestSearchResults={requestSearchResulsHandler}>
        <Layout>Some stuff for {user.given_name}</Layout>
        <br />
      </SearchPageProvider>
    </NotificationProvider>
  )
}

export default SearchPage
