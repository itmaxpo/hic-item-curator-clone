import { tokenManager } from 'utils/TokenManager'
import { notificationManager } from 'utils/NotificationManager'
import { stringify } from 'query-string'

/**
 * Performs an HTTP request. Using Fetch
 * Handles refreshing tokens if needed and stores auth0 token for every request
 *
 */
const request = async <Payload = any>(
  method: string,
  path: string,
  config?: Omit<RequestInit, 'body'> & { body?: Payload },
  contentType?: string,
  retries = 0
): Promise<Response> => {
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
  // nominatim request breaks if we include the auth token
  const headers: Record<string, string> = path.includes('nominatim')
    ? {}
    : {
        Authorization: `Bearer ${tokenManager.getToken()}`
      }

  if (method !== 'GET') {
    headers['Content-Type'] = contentType ? contentType : 'application/json'
  }

  let fetchOpts: RequestInit = { method, headers }

  if (config) {
    const { body, ...otherConfig } = config
    if (body) {
      fetchOpts.body = JSON.stringify(config.body)
    }
    fetchOpts = { ...fetchOpts, ...otherConfig }
  }

  return fetch(path, fetchOpts)
    .then((response) => {
      // valid response status
      const validStatuses = [200, 201, 302]

      // Check status
      if (response.status === 401) {
        console.warn(`Authorization error.`)
        notificationManager.notify({
          variant: 'error',
          message: `Got an Authorization error from the backend (${path}). Please refresh the page.`
        })
        return request(method, path, config, contentType, retries + 1)
      } else if (response.status === 404) {
        console.warn(`Could not find ${path}`)
        notificationManager.notify({ variant: 'error', message: `Service not found: ${path}` })
        return response
      } else if (!validStatuses.includes(response.status)) {
        let responseError: any

        response
          .json()
          .then(({ error }) => {
            responseError = error
          })
          .catch((error) => {
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
    .catch((error) => {
      console.warn('Error: ', error)
      notificationManager.notify({
        variant: 'error',
        message: 'Error - refresh page'
      })
      return error
    }) as Promise<Response>
}

export const requestJson = async <Response, Payload = any>(
  method: string,
  path: string,
  body?: Payload
): Promise<Response> => {
  let response = await request<Payload>(method, path, { body }, 'application/vnd.api+json')

  if (response.status >= 400) {
    let json: any = await response.json()

    throw json?.errors ?? json
  }

  return response.json()
}

export const getJson = (path: string, params: Record<string, any>) =>
  requestJson('GET', path + (params ? `?${stringify(params)}` : ''))

export default request