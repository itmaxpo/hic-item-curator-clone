import request from './request'

const fieldsToSelect = [
  'description',
  'safety',
  'currency',
  'cuisine',
  'climate',
  'dress',
  'additional_info',
  'name',
  'iso_code',
  'active_destination',
  'health',
  'electricity',
  'entry_requirements',
  'transport',
  'admin_level',
  'address',
  'geolocation',
  'supplier_tag'
]
/**
 * Return item fields
 *
 * @name getItemFieldsById
 * @param {String} id
 * @returns {Object}
 */
const getItemFieldsById = async id => {
  const selectedFields = `?selected_fields=${fieldsToSelect}`
  let res = await request(
    'GET',
    `${process.env.REACT_APP_KIWI_CONTENT_API}/items/${id}${selectedFields}`
  )

  return res.json()
}

/**
 * Return item geolocation as polygon coordinates
 *
 * @name getItemFieldsById
 * @param {String} id
 * @returns {Object}
 */
export const getItemPolygonCoordinatesById = async id => {
  let res = await request('GET', `${process.env.REACT_APP_KIWI_CONTENT_API}/items/${id}/polygon`)

  return res.json()
}

/**
 * Return item attachments
 *
 * @name getItemAttachmentsById
 * @param {String} id
 * @returns {Object}
 */
const getItemAttachmentsById = async id => {
  let res = await request(
    'GET',
    `${process.env.REACT_APP_KIWI_CONTENT_API}/items/${id}/attachments`
  )

  return res.json()
}

const updateItemFields = async (id, fields) => {
  let res = await request('PATCH', `${process.env.REACT_APP_KIWI_CONTENT_API}/items/${id}`, {
    body: {
      fields
    }
  })

  return res.json()
}

const getRoomsForAccommodation = async id => {
  let res = await request('POST', `${process.env.REACT_APP_KIWI_SEARCH_API}`, {
    body: {
      item_types: ['room'],
      query: {
        bool: {
          should: [
            {
              match: {
                parent_uuid: id
              }
            }
          ]
        }
      }
    }
  })

  return res.json()
}

/**
 * Create item
 *
 * @name createItem
 * @param {String} type
 * @param {String} name
 * @param {String} supplier
 * @param {Number} lat
 * @param {Number} lon
 * @param {String} locale
 * @returns {Object}
 */
const createItem = async (type, name, supplier, lat, lon, locale = 'en-GB') => {
  let res = await request('POST', `${process.env.REACT_APP_KIWI_CONTENT_API}/items`, {
    body: {
      item_type: type,
      fields: [
        {
          field_name: 'name',
          content: name,
          locale,
          source: supplier,
          source_key: 'gecko',
          content_type: 'string'
        },
        {
          field_name: 'dmc_id',
          content: supplier,
          source: supplier,
          source_key: 'gecko',
          content_type: 'string'
        },
        {
          field_name: 'geolocation',
          content: {
            lat,
            lon
          },
          source: supplier,
          source_key: 'gecko',
          content_type: 'geo_point'
        }
      ]
    }
  })

  return res.json()
}

export {
  getItemFieldsById,
  getItemAttachmentsById,
  updateItemFields,
  getRoomsForAccommodation,
  createItem
}
