import { tokenManager } from 'utils/TokenManager'
import { notificationManager } from 'utils/NotificationManager'
/* global Headers, fetch */

/**
 * Performs an HTTP request. Using Fetch
 * Handles refreshing tokens if needed and stores auth0 token for every request
 *
 * @name request
 * @params method, path, config
 * @returns {Promise<response>} response
 */
const request = async (method, path, config, contentType, retries = 0) => {
  if (!window.navigator.onLine) {
    notificationManager.notify({
      variant: 'error',
      message: 'You are offline! Your last changes did not apply. Please get online and try again.'
    })
    throw new Error('Offline')
  }

  if (retries > 2) {
    notificationManager.notify({
      variant: 'error',
      message:
        'There was an error by trying to save your changes, please try again or reload the page!'
    })
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

  return fetch(path, fetchOpts)
    .then(response => {
      // valid response status
      const validStatuses = [200, 201, 302]

      // Check status
      if (response.status === 401) {
        console.warn(`Authorization error.`)
        notificationManager.notify({
          variant: 'error',
          message: `Got an Authorization error from the backend (${path}). Please refresh the page.`
        })
        return request(method, path, config, retries + 1)
      } else if (response.status === 404) {
        console.warn(`Could not find ${path}`)
        notificationManager.notify({ variant: 'error', message: `Service not found: ${path}` })
        return response
      } else if (!validStatuses.includes(response.status)) {
        let responseError

        response
          .json()
          .then(({ error }) => {
            responseError = error
          })
          .catch(error => {
            responseError = error
          })
          .finally(() => {
            return Error(
              `Error communicating with ${path}: ${response.status} (${responseError.message})`
            )
          })
      }

      return response
    })
    .catch(error => {
      console.warn('Error: ', error)
      notificationManager.notify({
        variant: 'error',
        message: 'Error - refresh page'
      })
      return error
    })
}

export default request
