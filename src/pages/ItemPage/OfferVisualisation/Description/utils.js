export const parseInspirations = (description, inspirations) =>
  inspirations.map(({ source, value }) => {
    const isInspirationDisplayed = value === description

    return {
      label: source,
      value,
      badge: isInspirationDisplayed ? 'Displayed' : '',
      badgeColor: isInspirationDisplayed ? 'red' : ''
    }
  })
