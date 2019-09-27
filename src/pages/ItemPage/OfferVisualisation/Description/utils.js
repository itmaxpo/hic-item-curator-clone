export const parseInspirations = (description, inspirations) =>
  inspirations.map(({ source, value }) => {
    const isInspirationDisplayed = getRichTextValue(value) === getRichTextValue(description)

    return {
      label: source,
      value,
      badge: isInspirationDisplayed ? 'Displayed' : '',
      badgeColor: isInspirationDisplayed ? 'red' : ''
    }
  })

export const getRichTextValue = richText => {
  const emptyDiv = document.createElement('div')
  emptyDiv.innerHTML = richText
  return emptyDiv.innerText.trim()
}
