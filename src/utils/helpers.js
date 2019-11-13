import { SOURCE, WETU, SUPPLY } from './constants'

/*
 * We prioritize fields by it's source:
 * 1) Item curator
 * 2) WETU
 * 3) Anything else
 */
export const getFieldBySourcePriority = field => {
  const sourcePriorityOrder = [SOURCE, WETU, SUPPLY]

  for (let key of sourcePriorityOrder) {
    const foundKey = field.find(({ source }) => source.toLowerCase() === key)
    if (foundKey) {
      return foundKey
    }
  }
  return field[0]
}

export const onPageClosing = e => {
  e = e || window.event
  e.preventDefault()
  // The values below are irrelevant, most modern browsers force their own prompt window and message
  e.returnValue = 'If you continue, all changes will be lost'
  return 'If you continue, all changes will be lost'
}

/*
 * Returns string value of rich text.
 */
export const getRichTextValue = richText => {
  const emptyDiv = document.createElement('div')
  emptyDiv.innerHTML = richText
  return emptyDiv.innerText.trim()
}
