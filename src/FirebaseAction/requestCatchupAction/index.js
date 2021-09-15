import firestore from '@react-native-firebase/firestore';
import NotificationService from '../../services/NotificationService';
import localStorage from '../../library/LocalStorage';

export const requestCatchUpFB = async (dataStore) => {
    try {
        return new Promise((resolve, reject) => {
            const { customer_name, data } = dataStore;
            firestore()
                .collection("request_catchup_class")
                .doc(data.req_catch_class_id)
                .set(data)
                .then(data => {
                    sendUReqCatchupNotification(customer_name);
                    resolve(true)
                })
                .catch(err => reject(err))
        })
    } catch (error) {
        return null
    }
}

const sendUReqCatchupNotification = async (customer_name) => {
    const adminToken = await localStorage.getParseData('ADMIN_TOKEN');
    const notificationData = {
        'notification': {
            'title': `Request Catchup Class`,
            'body': `${customer_name} send Catchup Class request`
        },
        "data": {
            "type": "ReqCatch"
        },
        registration_ids: adminToken
    }

    await NotificationService.sendUniformNotification(JSON.stringify(notificationData));
}