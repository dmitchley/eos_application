import firestore from '@react-native-firebase/firestore';
import localStorage from '../../library/LocalStorage';
import _ from 'lodash';

export const requestAdminToken = async () => {
    try {
        return new Promise((resolve, reject) => {
            firestore()
                .collection("admin")
                .get()
                .then(async data => {
                    let response = [];
                    data.forEach((doc) => {
                        response.push(doc.data())
                    });
                    await localStorage.saveKey('ADMIN_TOKEN', JSON.stringify(response[0].token));
                    resolve(response[0].token)
                })
                .catch(err => reject(err))
        })
    } catch (error) {
        return null
    }
}

export const setGeneralNotiReadStatus = (noti_id, parent_id) => {
    return new Promise(async (resolve, reject) => {
        const userDocRef = await firestore().collection('notification').doc(noti_id);
        const doc = await userDocRef.get();
        const docData = doc.data();
        const parentIDArray = [parent_id];
        const readByArray = docData.read_by.length > 0 ? [...docData.read_by, ...parentIDArray] : parentIDArray;

        userDocRef
            .update({ read_by: _.uniqBy(readByArray) })
            .then(data => {
                resolve(true)
            })
            .catch(err => reject(err))
    })
}