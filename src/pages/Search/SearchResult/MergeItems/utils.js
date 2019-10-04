import { get } from 'lodash'
import { getFieldBySourcePriority } from 'utils/helpers'

export const parseMergedItem = item => {
  return {
    id: item.uuid,
    parentId: item.parent_uuid,
    type: item.item_type,
    title: getItemFieldValue(item.fields, 'name'),
    description: getItemFieldValue(item.fields, 'description') || 'No description found.',
    allImages: [],
    isLoading: true,
    isMerged: true
  }
}

const getItemFieldValue = (fields, fieldName) => {
  const field = fields.filter(({ field_name }) => field_name === fieldName)

  const engFields = field.filter(({ locale }) => locale === 'en-GB')
  const deFields = field.filter(({ locale }) => locale === 'de-DE')

  return (
    get(getFieldBySourcePriority(engFields), 'content') ||
    get(getFieldBySourcePriority(deFields), 'content')
  )
}
