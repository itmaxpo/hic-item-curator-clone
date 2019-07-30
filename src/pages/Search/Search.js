import React from 'react'
import Layout from 'components/Layout'
import { useAuth0 } from 'contexts/Auth/AuthProvider'

/**
 * This is the Search Page component
 * Also it is a Home page for the app and server as '/' route
 *
 * @name SearchPage
 * @param {Object} location from route
 * @returns {Object} Search Page
 */
const SearchPage = () => {
  const { user } = useAuth0()

  return <Layout>Some stuff for {user.given_name}</Layout>
}

export default SearchPage
