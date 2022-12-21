const mapProperty: any = [
  'name',
  'description',
  'safety',
  'currency',
  'cuisine',
  'climate',
  'dress',
  'health',
  'electricity',
  'entry_requirements',
  'additional_info',
  'transport'
]
export const getChangedFields = (
  dirtyFields: Record<string, any> | any,
  allValues: Record<string, any>
): Record<string, any> => {
  if (dirtyFields === true || Array.isArray(dirtyFields)) {
    return allValues
  }

  return Object.fromEntries(
    Object.keys(dirtyFields).map((key) =>
      mapProperty.includes(key)
        ? [`${key}_item_curator`, getChangedFields(dirtyFields[key], allValues[key])]
        : [key, getChangedFields(dirtyFields[key], allValues[key])]
    )
  )
}
