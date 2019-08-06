import { tokenManager } from './tokenManager'

/* global Headers, fetch */

/**
 * Performs an HTTP request. Using Fetch
 * Handles refreshing tokens if needed and stores auth0 token for every request
 *
 * @name request
 * @params method, path, config
 * @returns {Promise<response>} response
 */
const request = async (
  method,
  path,
  config,
  retries = 0,
  errorHandler = window.alert,
  contentType
) => {
  if (!window.navigator.onLine) {
    errorHandler(
      'You are offline! Your last changes did not apply. Please get online and try again.'
    )
    throw new Error('Offline')
  }

  if (retries > 2) {
    errorHandler(
      'There was an error by trying to save your offer, please try again or reload the page!'
    )
    throw new Error(`Error fetching ${path}`)
  }

  // Prepare request options
  // TODO: Get Auth0 token if required for requests. i.e: new Headers({ Authorization: `Bearer ${token}` })
  const headers = new Headers({
    Authorization: `Bearer ${tokenManager.getToken()}`
  })

  if (method !== 'GET') {
    const _contentType = contentType ? contentType : 'application/json'
    headers.set('Content-Type', _contentType)
  }

  let fetchOpts = { method, headers }

  if (config) {
    const { body, ...otherConfig } = config
    if (body) {
      fetchOpts.body = JSON.stringify(config.body)
    }
    fetchOpts = { ...fetchOpts, ...otherConfig }
  }

  const response = await fetch(path, fetchOpts)

  // valid response status
  const validStatuses = [200, 201, 302]

  // Check status
  if (response.status === 401) {
    console.warn(
      `Got an Authorization error from the backend (${path}). Trying to refresh the Auth token.`
    )
    return request(method, path, config, retries + 1)
  } else if (response.status === 404) {
    console.warn(`Could not find ${path}`)
    errorHandler(
      'The requested resource does not exist. Please try to find it through the main page search.'
    )
    return response
  } else if (!validStatuses.includes(response.status)) {
    console.warn(`Error fetching ${path}: ${response.status} (${response.statusCode})`)
    errorHandler('Something went wrong, please reload or try again.')
  }

  return response
}

export default request
