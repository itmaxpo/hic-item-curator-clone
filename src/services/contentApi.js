import request, { getJson, postJson } from './request'
import {
  FIELD_ISO_CODE,
  FIELD_NAME,
  FIELD_ORIGINAL_NAME,
  FIELD_DESCRIPTION,
  FIELD_GEOLOCATION,
  FIELD_ADDRESS,
  FIELD_MEAL_BASE,
  FIELD_ACTIVE_DESTINATION,
  FIELD_SAFETY,
  FIELD_CURRENCY,
  FIELD_TRANSPORT,
  FIELD_CUISINE,
  FIELD_CLIMATE,
  FIELD_DRESS,
  FIELD_ADDITIONAL,
  FIELD_HEALTH,
  FIELD_ELECTRICITY,
  FIELD_ENTRY_REQUIREMENTS,
  FIELD_ADMIN_LEVEL,
  FIELD_POLYGON,
  FIELD_ROOMS,
  FIELD_PHOTOS,
  FIELD_SUPPLIER_TAG,
  FIELD_FRONT_DESK_PHONE,
  FIELD_ACCOMM_CATEGORY,
  FIELD_BLOCKED,
  FIELD_ACCOMM_RANKING,
  FIELD_VISUALIZATION_DESTINATION,
  FIELD_DMC_ID,
  FIELD_EXTERNAL_ID
} from 'pages/Item/itemParser'

// Add field names to receive them from BE
const fieldsToSelect = [
  FIELD_ISO_CODE,
  FIELD_NAME,
  FIELD_ORIGINAL_NAME,
  FIELD_DESCRIPTION,
  FIELD_GEOLOCATION,
  FIELD_ADDRESS,
  FIELD_MEAL_BASE,
  FIELD_ACTIVE_DESTINATION,
  FIELD_SAFETY,
  FIELD_CURRENCY,
  FIELD_TRANSPORT,
  FIELD_CUISINE,
  FIELD_CLIMATE,
  FIELD_DRESS,
  FIELD_ADDITIONAL,
  FIELD_HEALTH,
  FIELD_ELECTRICITY,
  FIELD_ENTRY_REQUIREMENTS,
  FIELD_ADMIN_LEVEL,
  FIELD_POLYGON,
  FIELD_ROOMS,
  FIELD_PHOTOS,
  FIELD_SUPPLIER_TAG,
  FIELD_FRONT_DESK_PHONE,
  FIELD_ACCOMM_CATEGORY,
  FIELD_BLOCKED,
  FIELD_ACCOMM_RANKING,
  FIELD_VISUALIZATION_DESTINATION,
  FIELD_DMC_ID,
  FIELD_EXTERNAL_ID
]
/**
 * Return item fields
 *
 * @name getItemFieldsById
 * @param {String} id
 * @returns {Object}
 */
const getItemFieldsById = async (id) => {
  const selectedFields = `?selected_fields=${fieldsToSelect}`
  let res = await request(
    'GET',
    `${process.env.REACT_APP_PARTNERS_API}/content/items/${id}${selectedFields}`
  )

  // TODO: Check the actual response after TRIP-17

  return res.json()
}

/**
 * Return item geolocation as polygon coordinates
 *
 * @name getItemFieldsById
 * @param {String} id
 * @returns {Object}
 */
const getItemPolygonCoordinatesById = async (id) => {
  let res = await request(
    'GET',
    `${process.env.REACT_APP_PARTNERS_API}/content/items/${id}/polygon`
  )

  return res.json()
}

const getItemAttachmentsById = async (id, offset = 0, itemType) =>
  getJson(`${process.env.REACT_APP_PARTNERS_API}/content/items/${id}/attachments`, {
    offset,
    limit: 50,
    item_type: itemType
  })

/**
 * Update item attachment by id
 *
 * @name updateItemAttachmentsById
 * @param {String} id
 * @param {String} attachments
 * @returns {Object}
 */
const updateItemAttachmentsById = async (id, type, attachments, isVisible) => {
  let req = (att) =>
    request(
      'PATCH',
      `${process.env.REACT_APP_PARTNERS_API}/content/items/${id}/attachments/${att.id}`,
      {
        body: {
          item_type: type,
          tags: {
            ...att.tags,
            visible: isVisible,
            order: att.order
          }
        }
      }
    )

  const promises = await Promise.all([
    ...attachments.map((att) => req(att).then((res) => res.json()))
  ])

  return promises
}

const updateItemFields = async (id, fields) => {
  let res = await request(
    'PATCH',
    `${process.env.REACT_APP_PARTNERS_API}/content/items/${id}?ignore_dupes=true`,
    {
      body: {
        fields
      }
    }
  )

  return res.json()
}

const getRoomsForAccommodation = async (id) => {
  let res
  // add a condition to modify request if it is e2e test environment
  if (window.Cypress || process.env.REACT_APP_CI) {
    res = await request(
      'POST',
      `${process.env.REACT_APP_PARTNERS_API}/search/v1/items?test-room`,
      {}
    )
  } else {
    res = await request('POST', `${process.env.REACT_APP_PARTNERS_API}/search/v1/items`, {
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
  }

  return res.json()
}

/**
 * Merge items
 *
 * @name mergeItems
 * @param {Array<String>} ids
 * @returns {Object} merged item
 */
const mergeItems = async (ids) => {
  let res = await postJson(`${process.env.REACT_APP_PARTNERS_API}/content/items/merge`, {
    item_uuids: ids,
    selected_fields: '*'
  })

  return res
}

export {
  getItemFieldsById,
  getItemAttachmentsById,
  updateItemAttachmentsById,
  updateItemFields,
  getRoomsForAccommodation,
  mergeItems,
  getItemPolygonCoordinatesById
}
