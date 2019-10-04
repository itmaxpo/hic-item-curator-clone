import { useContext } from 'react'
import NotificationContext from './NotificationContext'

/**
 * useNotification custom hook.
 */
const useNotification = () => {
  const { enqueueNotification, closeNotification } = useContext(NotificationContext)

  return {
    enqueueNotification,
    closeNotification
  }
}

export default useNotification
