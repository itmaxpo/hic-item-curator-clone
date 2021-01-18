import queryString from 'query-string'
import request, { getJson } from './request'
import { mockSuppliers, mockAttachments, mockItemFields, mockPolygon } from './mocks'
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
  FIELD_VISUALIZATION_DESTINATION
} from 'pages/Item/itemParser'

const onLighthouseMode = queryString.parse(window.location.search).lighthouse === 'true'
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
  FIELD_VISUALIZATION_DESTINATION
]
/**
 * Return item fields
 *
 * @name getItemFieldsById
 * @param {String} id
 * @returns {Object}
 */
const getItemFieldsById = async (id) => {
  if (onLighthouseMode) return mockItemFields

  const selectedFields = `?selected_fields=${fieldsToSelect}`
  let res = await request(
    'GET',
    `${process.env.REACT_APP_KIWI_CONTENT_API}/items/${id}${selectedFields}`
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
  if (onLighthouseMode) return mockPolygon
  let res = await request('GET', `${process.env.REACT_APP_KIWI_CONTENT_API}/items/${id}/polygon`)

  return res.json()
}

/**
 * Return suppliers
 *
 * @name getSuppliers
 * @param {Number} offset
 * @returns {Object}
 */
const getSuppliers = async () => {
  if (onLighthouseMode) return mockSuppliers

  let res = await request('GET', process.env.REACT_APP_KIWI_SUPPLIERS_API)

  return res.json()
}

const getItemAttachmentsById = async (id, offset = 0, itemType) => {
  if (onLighthouseMode) return mockAttachments

  return getJson(`${process.env.REACT_APP_KIWI_CONTENT_API}/items/${id}/attachments`, {
    offset,
    limit: 50,
    item_type: itemType
  })
}

/**
 * Update item attachment by id
 *
 * @name updateItemAttachmentsById
 * @param {String} id
 * @param {String} attachments
 * @returns {Object}
 */
const updateItemAttachmentsById = async (id, attachments, isVisible) => {
  let req = (att) =>
    request(
      'PATCH',
      `${process.env.REACT_APP_KIWI_CONTENT_API}/items/${id}/attachments/${att.id}`,
      {
        body: {
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
    `${process.env.REACT_APP_KIWI_CONTENT_API}/items/${id}?ignore_dupes=true`,
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
    res = await request('POST', `${process.env.REACT_APP_KIWI_SEARCH_API}?test-room`, {})
  } else {
    res = await request('POST', `${process.env.REACT_APP_KIWI_SEARCH_API}`, {
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
  let res = await request('POST', `${process.env.REACT_APP_KIWI_CONTENT_API}/items/merge`, {
    body: {
      item_uuids: ids,
      selected_fields: '*'
    }
  })

  return res.json()
}

export {
  getItemFieldsById,
  getItemAttachmentsById,
  updateItemAttachmentsById,
  updateItemFields,
  getRoomsForAccommodation,
  mergeItems,
  getItemPolygonCoordinatesById,
  getSuppliers
}
