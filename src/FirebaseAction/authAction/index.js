import firestore from '@react-native-firebase/firestore';
import NotificationService from '../../services/NotificationService';
import localStorage from '../../library/LocalStorage';
import md5 from 'md5';

export const authRequest = async (dataStore) => {
    try {
        return new Promise((resolve, reject) => {
            const { email, password, noti_token } = dataStore;
            firestore()
                .collection("parents")
                .where("email", '==', email)
                .get()
                .then(async data => {
                    let response = [];
                    data.forEach((doc) => {
                        response.push(doc.data())
                    });

                    if (response[0].email === email && response[0].password === md5(password)) {
                        const isTokenSave = await saveNotificationToken(response[0].parent_id, noti_token);
                        if (isTokenSave) {
                            localStorage.saveKey("USER_INFO_KEY", JSON.stringify(response[0]));
                            resolve(true)
                        }
                    } else {
                        resolve(false)
                    }
                })
                .catch(err => reject(err))
        })
    } catch (error) {
        return null
    }
}

const saveNotificationToken = (parent_id, noti_token) => {
    return new Promise((resolve, reject) => {
        firestore()
            .collection("parents")
            .doc(parent_id)
            .update({ noti_token: noti_token })
            .then(data => {
                resolve(true)
            })
            .catch(err => reject(err))
    })
}