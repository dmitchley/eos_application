import firestore from '@react-native-firebase/firestore';
import NotificationService from '../../services/NotificationService';
import localStorage from '../../library/LocalStorage';

export const getChildClassInfo = async (dataStore) => {
    try {
        return new Promise(async (resolve, reject) => {
            const childInfo = await localStorage.getParseData('CURRENT_CHILD');
            const { children_id } = childInfo;
            firestore()
                .collection("booking")
                .where("children_id", '==', children_id)
                .get()
                .then(async data => {
                    let response = [];
                    if (data.size > 0) {
                        data.forEach(async (doc, index) => {
                            // response.push(doc.data())
                            const dataHolder = doc.data();

                            const classesData = await getChildClass(dataHolder);
                            const locationData = await getChildLocation(dataHolder);
                            const teacherData = await getChildTeacher(dataHolder);
                            const classInfoData = {
                                ...dataHolder,
                                class_type: classesData.class_name,
                                location: locationData.location_name,
                                teacher: teacherData == null ? null : `${teacherData.fname} ${teacherData.lname}`,
                                class_id: classesData.class_id, location_id: locationData.location_id,
                                teacher_id: teacherData == null ? null : teacherData.teacher_id
                            }

                            response.push(classInfoData);

                            if (index === data.size - 1) {
                                resolve(response)
                            }

                        });
                    } else {
                        resolve([])
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
                })
                .catch(err => reject(err))
        })
    } catch (error) {
        return null
    }
}

export const getChildLocation = (data) => {
    try {
        return new Promise(async (resolve, reject) => {
            const { location_id } = data;
            firestore()
                .collection("location")
                .where("location_id", '==', location_id)
                .get()
                .then(data => {
                    let response = [];
                    data.forEach((doc) => {
                        response.push(doc.data())
                    });

                    resolve(response[0])
                })
                .catch(err => reject(err))
        })
    } catch (error) {
        return null
    }
}

export const getChildTeacher = (data) => {
    try {
        return new Promise(async (resolve, reject) => {
            const { teacher_id } = data;
            // const teacher_id = '123';
            firestore()
                .collection("teacher")
                .where("teacher_id", '==', teacher_id)
                .get()
                .then(data => {
                    let response = [];
                    if(data.size > 0) {
                        data.forEach((doc) => {
                            response.push(doc.data())
                        });
    
                        resolve(response[0])
                    } else {
                        resolve(null)
                    }
                  
                })
                .catch(err => reject(err))
        })
    } catch (error) {
        return null
    }
}