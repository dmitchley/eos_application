import firestore from '@react-native-firebase/firestore';
import NotificationService from '../../services/NotificationService';
import localStorage from '../../library/LocalStorage';

export const getChildInvoice = async (dataStore) => {
    try {
        return new Promise(async (resolve, reject) => {
            const childInfo = await localStorage.getParseData('CURRENT_CHILD');
            const { children_id } = childInfo;
            firestore()
                .collection("due_invoices")
                .where("children_id", '==', children_id)
                .get()
                .then(async data => {
                    let response = [];
                    data.forEach((doc) => {
                        response.push(doc.data())
                    });

                    // resolve(response);
                    if(response.length > 0) {
                        const classesData = await getChildClass(response[0]);
                        const invoiceData = { ...response[0], class_type: classesData.class_name }
                        resolve(invoiceData)
                    } else {
                        resolve({})
                    }
                  
                })
                .catch(err => reject(err))
        })
    } catch (error) {
        return null
    }
}

export const getChildClass = (data) => {
    try {
        return new Promise(async (resolve, reject) => {
            const { class_id } = data;
            firestore()
                .collection("classes")
                .where("class_id", '==', class_id)
                .get()
                .then(data => {
                    let response = [];
                    data.forEach((doc) => {
                        response.push(doc.data())
                    });

                    resolve(response[0])
                    // resolve({ ...data, class_type: response[0].class_type })
                })
                .catch(err => reject(err))
        })
    } catch (error) {
        return null
    }
}

export const setMarkasPaid = (due_invoices_id) => {
    try {
        return new Promise(async (resolve, reject) => {
            firestore()
                .collection('due_invoices')
                .doc(due_invoices_id)
                .update({
                    is_paid: true
                })
                .then(data => {
                    resolve(true)
                })
                .catch(err => reject(err))
        })
    } catch (error) {
        return null
    }
}

