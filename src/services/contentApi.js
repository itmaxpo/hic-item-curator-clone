import request from './request'

/**
 * Return item fields
 *
 * @name getItemFieldsById
 * @param {String} id
 * @returns {Object}
 */
const getItemFieldsById = async id => {
  let res = await request('GET', `${process.env.REACT_APP_KIWI_CONTENT_API}/items/${id}`)

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

const updateItemFields = async (id, data) => {
  let res = await request('PATCH', `${process.env.REACT_APP_KIWI_CONTENT_API}/items/${id}`, {
    body: {
      // fields: [
      //   {
      //     "field_name": "active_destination",
      //     "content": true,
      //     "source": "tourvest",
      //     "source_key": "gecko"
      //   }
      // ]
    }
  })

  return res.json()
}

const getRoomsForAccommodation = async (id = '0def0040-4360-4cf3-90de-33c2097b2d8c') => {
  let res = await request('POST', `${process.env.REACT_APP_KIWI_SEARCH_API}`, {
    body: {
      item_types: ['rooms'],
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

export { getItemFieldsById, getItemAttachmentsById, updateItemFields, getRoomsForAccommodation }
