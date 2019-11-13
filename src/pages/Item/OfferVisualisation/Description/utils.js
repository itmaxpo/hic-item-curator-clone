import { getRichTextValue } from 'utils/helpers'

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
