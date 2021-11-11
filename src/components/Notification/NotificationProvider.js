import React, { useState, useEffect, useCallback, useMemo } from 'react'
import NotificationContext from './NotificationContext'
import NotificationHub from './NotificationHub'
import { notificationManager } from 'utils/NotificationManager'

const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([])

  const enqueueNotification = useCallback(
    ({
      key = new Date().getTime() + Math.random(),
      autoHideDuration = 5000,
      onClose,
      ...notification
    }) => {
      const timer = setTimeout(() => {
        removeNotification(key)
        onClose?.()
      }, autoHideDuration)

      const closeNotification = (runOnClose = true) => {
        clearTimeout(timer)
        removeNotification(key)
        if (runOnClose) {
          onClose?.()
        }
      }

      setNotifications((notifications) => [
        ...notifications,
        { key, onClose: closeNotification, ...notification }
      ])

      return closeNotification
    },
    []
  )

  const removeNotification = (key) => {
    setNotifications((notifications) =>
      notifications.filter((notification) => notification.key !== key)
    )
  }

  // effect to assign notification singleton the enqueueNotification method.
  // this allows dispatching notifications from the request class
  useEffect(() => {
    notificationManager.setPushNotification(enqueueNotification)
  }, [enqueueNotification])

  const contextValue = useMemo(() => ({ enqueueNotification }), [enqueueNotification])

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
      <NotificationHub notifications={notifications} />
    </NotificationContext.Provider>
  )
}

export default NotificationProvider
