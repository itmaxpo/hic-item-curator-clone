import { getItemFieldsById, getItemAttachmentsById } from 'services/contentApi'
import { AREA_ITEM_TYPE, ACCOMMODATION_ITEM_TYPE } from 'pages/ItemPage/utils'
import { get, find } from 'lodash'

export const enrichItem = async item => {
  const arrayOfPromises = []

  switch (item.type) {
    case AREA_ITEM_TYPE: {
      arrayOfPromises.push(getItemAttachmentsById(item.id))
      break
    }
    case ACCOMMODATION_ITEM_TYPE: {
      arrayOfPromises.push(getItemAttachmentsById(item.id), getItemFieldsById(item.id))
      break
    }
    default:
      return
  }

  return await Promise.all(arrayOfPromises).then(values => {
    const [attachmentsResponse, fieldsResponse] = values

    return {
      ...item,
      ...parseAttachmentsResponse(attachmentsResponse),
      ...parseFieldsResponse(fieldsResponse),
      isLoading: false
    }
  })
}

const parseAttachmentsResponse = response => (response ? { photos: response.data } : null)

const parseFieldsResponse = response =>
  response
    ? {
        description: get(
          find(response.data.fields, field => field.field_name === 'description'),
          'content',
          'No description found.'
        )
      }
    : null
