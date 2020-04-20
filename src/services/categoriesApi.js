import request from './request'

/**
 * Get the list of existing accommodation categories from backend
 * @returns {Object}
 *
 */

export const getCategoriesApi = async () => {
  const res = await request(
    'GET',
    `${process.env.REACT_APP_KIWI_CONTENT_API}/items?item_type=accommodation_category&offset=0`
  )
  return res.json()
}
