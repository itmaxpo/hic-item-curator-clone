import { get } from 'lodash'
import { getSource } from 'pages/Item/itemParser'
import { ACCOMMODATION_ITEM_TYPE } from 'utils/constants'
import { getFieldBySourcePriority } from 'utils/helpers'

export const parseMergedItem = (item) => {
  return {
    id: item.uuid,
    parentId: item.parent_uuid,
    type: item.item_type,
    title: getItemFieldValue('name', item.fields),
    description: getItemFieldValue('description', item.fields) || 'No description found.',
    allImages: [],
    isLoading: true,
    isMerged: true,
    ...(item.item_type === ACCOMMODATION_ITEM_TYPE ? { source: getSource(item) } : {})
  }
}

const getItemFieldValue = (fieldName, fields = []) => {
  const field = fields.filter(({ field_name }) => field_name === fieldName)

  const engFields = field.filter(({ locale }) => locale === 'en-GB')
  const deFields = field.filter(({ locale }) => locale === 'de-DE')

  return (
    get(getFieldBySourcePriority(engFields), 'content') ||
    get(getFieldBySourcePriority(deFields), 'content')
  )
}
