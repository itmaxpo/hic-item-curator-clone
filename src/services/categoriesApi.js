import request from './request'

/**
 * Get the list of existing accommodation categories from backend
 * @returns {Object}
 *
 */

export const getCategoriesApi = async () => {
  let res
  // add a condition to modify request if it is e2e test environment
  if (window.Cypress || process.env.REACT_APP_CI) {
    res = await request(
      'GET',
      `${process.env.REACT_APP_KIWI_CONTENT_API}/items?item_type=accommodation_category`,
      {}
    )
  } else {
    res = await request(
      'GET',
      `${process.env.REACT_APP_KIWI_CONTENT_API}/items?item_type=accommodation_category&offset=0`
    )
  }
  return res.json()
}
