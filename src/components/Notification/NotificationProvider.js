import React, { useCallback, useMemo, useReducer } from 'react'
import NotificationContext from './NotificationContext'
import NotificationHub from './NotificationHub'

const initialState = {
  notifications: []
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'enqueueNotification': {
      const key = action.notification.key || new Date().getTime() + Math.random()

      const newNotification = {
        key,
        ...action.notification
      }

      return {
        ...state,
        notifications: [...state.notifications, newNotification]
      }
    }
    case 'closeNotification':
      return {
        ...state,
        notifications: state.notifications.filter(notification => notification.key !== action.key)
      }
    default:
      throw new Error()
  }
}

/**
 * NotificationProvider component.
 *
 * @name NotificationProvider
 * @params {Array<React.Component>} children
 * @returns NotificationProvider
 */
const NotificationProvider = ({ children }) => {
  const [{ notifications }, dispatch] = useReducer(reducer, initialState)

  // display a new notification with the provided Notification props
  const enqueueNotification = useCallback(notification => {
    dispatch({ type: 'enqueueNotification', notification })
  }, [])

  // close the notification with the provided key
  const closeNotification = useCallback(key => {
    dispatch({ type: 'closeNotification', key })
  }, [])

  const contextValue = useMemo(() => ({ enqueueNotification, closeNotification }), [
    enqueueNotification,
    closeNotification
  ])

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
      <NotificationHub notifications={notifications} closeNotification={closeNotification} />
    </NotificationContext.Provider>
  )
}

export default NotificationProvider
