import { useContext } from 'react'
import requestFunction from 'services/request'
import NotificationContext from './NotificationContext'

/**
 * useRequestWithErrorNotification
 *
 * Returns a function that calls the 'request' function with a custom handler
 * that shows a notification on error.
 */
const useRequestWithErrorNotification = () => {
  const { enqueueNotification } = useContext(NotificationContext)

  const handleRequestError = message => {
    enqueueNotification({
      variant: 'error',
      message
    })
  }

  const request = async (method, path, config, retries) => {
    return requestFunction(method, path, config, retries, handleRequestError)
  }

  return request
}

export default useRequestWithErrorNotification
