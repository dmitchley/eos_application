import messaging from '@react-native-firebase/messaging';
import LocalStorage from '../library/LocalStorage';
import client from './HttpClient';

class FCMService {
  register = (onRegister, onNotification, onOpenNotification) => {
    this.checkPermission(onRegister)
    this.createNoitificationListeners(onRegister, onNotification, onOpenNotification)
  }

  checkPermission = (onRegister) => {
    messaging().hasPermission()
      .then(enabled => {
        if (enabled) {
          //user has permission
          this.getToken(onRegister)
        } else {
          //user don't have permission
          this.requestPermission(onRegister)
        }
      }).catch(error => {
        console.log("Permission rejected", error)
      })
  }

  getToken = (onRegister) => {
    messaging().getToken()
      .then(async fcmToken => {
        if (fcmToken) {
          await LocalStorage.saveKey('FCM_TOKEN_KEY', JSON.stringify(fcmToken));
          onRegister(fcmToken)
        } else {
          console.log("User does not have a device token")
        }
      }).catch(error => {
        console.log("getToken rejected ", error)
      })
  }

  requestPermission = (onRegister) => {
    messaging().requestPermission()
      .then(() => {
        this.getToken(onRegister)
      }).catch(error => {
        console.log("Requested persmission rejected ", error)
      })
  }

  deletedToken = () => {
    messaging().deleteToken()
      .catch(error => {
        console.log("Delected token error ", error)
      })
  }

  createNoitificationListeners = (onRegister, onNotification, onOpenNotification) => {
    //notification is clicked / tapped / opened as follows 
    this.notificationOpenedListener = messaging().onNotificationOpenedApp((notificationOpen) => {
        console.log(notificationOpen)
        if (notificationOpen) {
          const notification = notificationOpen.notification
          onOpenNotification(notificationOpen)
          this.removeDelieveredNotification(notification)
        }
      })

    // if your app is closed, you can check if  it was opened by notification
    // being  clicked / tapped / opened as follows
    messaging().getInitialNotification()
      .then(notificationOpen => {
        if (notificationOpen) {
          const notification = notificationOpen.notification
          onOpenNotification(notification)
          this.removeDelieveredNotification(notification)

        }
      })

    // Triggered for data only payload  in foreground 
    this.messageListener = messaging().onMessage((message) => {
      console.clear();
      console.log(message)
      onNotification(message)
    })

    // Triggered when have  new token
    this.onTokenRefreshListener = messaging().onTokenRefresh(fcmToken => {
      console.log("FCM new token: ", fcmToken)
      onRegister(fcmToken)
    })
  }

  removeDelieveredNotification(notification) {
    console.log('---- NOTIFICATION PRESS ----')
  }

  unRegister = () => {
    this.notificationOpenedListener()
    this.messageListener()
    this.onTokenRefreshListener()
  }

  async sendFBMessage(params) {
    let result = {}

    try {
      let api_name = "fcm/send"; // API name that concate with baseUrl
      result = await client.postHeader(api_name, params) // call get API
      // console.log(result)
    } catch (error) {
      console.log("users GET API: " + e);
    }
    return result
  }

}

export const fcmService = new FCMService()