import request from './request'

/**
 * Get the list of existing accommodation categories from backend
 * @returns {Object}
 *
 */

export const getAccommCategoriesApi = async () => {
  const res = await request(
    'GET',
    `${process.env.REACT_APP_PARTNERS_API}/content/items?item_type=accommodation_category&offset=0`
  )
  return res.json()
}
