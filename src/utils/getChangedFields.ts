export function getChangedFields(
  dirtyFields: Record<string, any> | any,
  allValues: Record<string, any>,
  mapProperties: string[] = []
): Record<string, any> {
  if (dirtyFields === true || Array.isArray(dirtyFields)) {
    return allValues
  }

  return Object.fromEntries(
    Object.keys(dirtyFields).map((key) =>
      mapProperties.includes(key)
        ? [`${key}_item_curator`, getChangedFields(dirtyFields[key], allValues[key], mapProperties)]
        : [key, getChangedFields(dirtyFields[key], allValues[key], mapProperties)]
    )
  )
}
