/* global Headers, fetch */
import { useAuth0 } from 'contexts/Auth/AuthWrapper'

/**
 * Performs an HTTP request.
 * Handles refreshing tokens if needed.
 */
const request = async (
  method,
  path,
  config,
  retries = 0,
  errorHandler = window.alert,
  contentType
) => {
  const { loginWithRedirect } = useAuth0()

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
  const headers = new Headers({ Authorization: `Bearer ${auth.token}` })
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
    await loginWithRedirect({})
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
