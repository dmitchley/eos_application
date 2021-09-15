import firestore from '@react-native-firebase/firestore';
import NotificationService from '../../services/NotificationService';
import localStorage from '../../library/LocalStorage';

export const addUniformRequest = async (dataStore) => {
    try {
        return new Promise((resolve, reject) => {
            const { parent_name, data } = dataStore;
            firestore()
                .collection("uniform_request")
                .doc(data.uniform_request_id)
                .set(data)
                .then(data => {
                    sendUniformReqNotification(parent_name);
                    resolve(true)
                })
                .catch(err => reject(err))
        })
    } catch (error) {
        return null
    }
}

const sendUniformReqNotification = async (userName) => {
    const adminToken = await localStorage.getParseData('ADMIN_TOKEN');
    const notificationData = {
        'notification': {
            'title': `Uniform Request`,
            'body': `${userName} send uniform request`
        },
        "data": {
            "type": "Uniform"
        },
        registration_ids: adminToken
    }

    await NotificationService.sendUniformNotification(JSON.stringify(notificationData));
}