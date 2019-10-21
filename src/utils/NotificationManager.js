/**
 * Notification management service
 *
 */

class NotificationManager {
  pushNotification = () => {}

  setPushNotification = pushNotification => {
    this.pushNotification = pushNotification
  }

  notify = message => {
    this.pushNotification(message)
  }
}

const notificationManager = new NotificationManager()
export { notificationManager }
