import request from './request'

/**
 * Get the list of existing accommodation categories from backend
 * @returns {Object}
 *
 */

const _accommodationCache = { categories: [] }
export const getAccommodationCategoriesApi = async () => {
  if (_accommodationCache.categories.length === 0) {
    const res = await request(
      'GET',
      `${process.env.REACT_APP_PARTNERS_API}/content/items?item_type=accommodation_category&offset=0`
    )
    return res.json()
  }

  return _accommodationCache.categories
}
