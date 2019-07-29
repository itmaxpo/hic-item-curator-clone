import request from './request'

/**
 * Return all search results from server
 *
 * @name getSearchResults
 * @param {Object} payload
 */
const getSearchResults = async payload => {
  let res = await request('GET', `${process.env.REACT_APP_SEARCH_API}`)

  return res.json()
}

export { getSearchResults }
