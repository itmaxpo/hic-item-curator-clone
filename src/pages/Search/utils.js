import { forEach } from 'lodash'

export const getSearchResultsPayload = (currentSearchResults, newSearchResults) => ({
  areResults: newSearchResults.areUsers
})

const fieldValidator = (field, value) => {
  switch (field) {
    default:
      break
  }
}

export const validator = state => {
  let errorObject = {}

  const fields = Object.keys(state)

  forEach(fields, field => {
    errorObject = { ...errorObject, ...fieldValidator(field, state[field]) }
  })

  return errorObject
}
