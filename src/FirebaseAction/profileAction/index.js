import firestore from '@react-native-firebase/firestore';
import localStorage from '../../library/LocalStorage';
import storage from '@react-native-firebase/storage';

export const uploadParentProfileToStorage = (profilePicData) => {
    return new Promise((resolve, reject) => {
        const { selectedImgPath, parent_id, imgName } = profilePicData
        let reference = storage().ref(`ParentProfilePic/${imgName}`);
        let task = reference.putFile(selectedImgPath);

        task.then((response) => {
            storage()
                .ref("ParentProfilePic")
                .child(imgName)
                .getDownloadURL()
                .then(async (url) => {
                    const isProfileSet = await setParentProfileFB(parent_id, url);
                    if (isProfileSet) {
                        resolve(url)
                    }
                });
        }).catch((e) => console.log('uploading image error => ', e));
    })
}

export const setParentProfileFB = async (parentId, url) => {
    try {
        return new Promise((resolve, reject) => {
            firestore()
                .collection('parents')
                .doc(parentId)
                .update({
                    parentProfilePic: url,
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

export const updateParentProfileFB = async (parentId, payload) => {
    try {
        return new Promise((resolve, reject) => {
            firestore()
                .collection('parents')
                .doc(parentId)
                .update(payload)
                .then(data => {
                    resolve(true)
                })
                .catch(err => reject(err))
        })
    } catch (error) {
        return null
    }
}