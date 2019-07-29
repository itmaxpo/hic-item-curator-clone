import { useContext } from 'react'
import NotificationContext from './NotificationContext'

/**
 * useNotification custom hook.
 *
 * @name useNotification
 * @returns {Function} enqueueNotification
 * @returns {Function} closeNotification
 */
const useNotification = () => {
  const { enqueueNotification, closeNotification } = useContext(NotificationContext)

  return {
    enqueueNotification,
    closeNotification
  }
}

export default useNotification
