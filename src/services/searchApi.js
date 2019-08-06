import request from './request'

/**
 * Return all search results from server
 *
 * @name getSearchResults
 * @param {Object} payload
 */
const getSearchResults = async payload => {
  // This is example of usage
  let res = await request('GET', 'https://kiwi.tlservers.com/search/v1/status')

  return res.json()
}

export { getSearchResults }
