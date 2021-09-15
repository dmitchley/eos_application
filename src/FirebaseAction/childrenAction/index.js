import firestore from '@react-native-firebase/firestore';
import NotificationService from '../../services/NotificationService';
import localStorage from '../../library/LocalStorage';

export const getChildren = async (dataStore) => {
    try {
        return new Promise(async (resolve, reject) => {
            const userInfo = await localStorage.getParseData('USER_INFO_KEY');
            const { parent_id } = userInfo;
            firestore()
                .collection("children")
                .where("parent_id", '==', parent_id)
                .get()
                .then(data => {
                    let response = [];
                    data.forEach((doc) => {
                        response.push(doc.data())
                    });

                    resolve(response);
                })
                .catch(err => reject(err))
        })
    } catch (error) {
        return null
    }
}