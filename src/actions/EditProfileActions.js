import firebase from '@firebase/app'
import '@firebase/auth'
import '@firebase/database'
import '@firebase/storage'
import RNFetchBlob from 'react-native-fetch-blob'

import {
    INIT_EDIT_PROFILE,
    USERNAME_CHANGE,
    PROFILE_IMAGE_CHANGE,
    SAVE_PROFILE,
    EDIT_PROFILE_FAIL,
    EDIT_PROFILE_SUCCESS,    
    LOGIN_USER_SUCCESS
} from './types'

export const initEditProfile = ({ username, profileImage }) => {
    return {
        type: INIT_EDIT_PROFILE,
        payload: {
            username,
            profileImage
        }
    }
}

export const inputUsernameChange = (username) => {
    return {
        type: USERNAME_CHANGE,
        payload: username
    }
    
}

export const imageProfileChange = (photo) => {
    return {
        type: PROFILE_IMAGE_CHANGE,
        payload: photo
    }

}

export const saveProfile = ({ username, profileImage }) => {
    return (dispatch) => {
        dispatch({
            type: SAVE_PROFILE
        })

        const { currentUser } = firebase.auth()

        if(profileImage) {
            const image = profileImage
 
            const Blob = RNFetchBlob.polyfill.Blob
            const fs = RNFetchBlob.fs
            window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
            window.Blob = Blob
        
        
            let uploadBlob = null

            // var randLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26))
            var nama = currentUser.displayName.toLocaleLowerCase().replace(/\s/g, '')
            var uniqid = nama + Date.now() + '.jpg'

            const imageRef = firebase.storage().ref('users').child(uniqid)
            let mime = 'image/jpg'
            fs.readFile(image, 'base64')
            .then((data) => {
                return Blob.build(data, { type: `${mime};BASE64` })
            })
            .then((blob) => {
                uploadBlob = blob
                return imageRef.put(blob, { contentType: mime })
            })
            .then(() => {
                uploadBlob.close()
                return imageRef.getDownloadURL()
            })
            .then((url) => {
                // URL of the image uploaded on Firebase storage
                console.log(url);

                return currentUser.updateProfile({
                    displayName: username,
                    photoURL: url
                }).then(()=> {
                    return firebase.database().ref(`/users/${currentUser.uid}`)
                        .once('value', snapshot => {
                            console.log('Sanpshot val: ', snapshot.val());
                            console.log('Hasil Object key:', Object.keys(snapshot.val()));
                            var id = Object.keys(snapshot.val())[0]
                            return firebase.database().ref(`/users/${currentUser.uid}/${id}`)
                                .set({
                                    displayName: username,
                                    photoURL: url
                                })
                        })
                })
                
            })
            .then(()=> {
                dispatch({
                    type: EDIT_PROFILE_SUCCESS
                })
                dispatch({
                    type: LOGIN_USER_SUCCESS,
                    payload: currentUser
                })
            })
            .catch((error) => {
                console.log(error);
                dispatch({
                    type: EDIT_PROFILE_FAIL,
                    payload: error.message
                })
        
            }) 

        } else {
            currentUser.updateProfile({
                displayName: username,
            })
            .then(()=> {
                return firebase.database().ref(`/users/${currentUser.uid}`)
                    .once('value', snapshot => {
                        console.log('Sanpshot val: ', snapshot.val());
                        console.log('Hasil Object key:', Object.keys(snapshot.val()));
                        var id = Object.keys(snapshot.val())[0]
                        return firebase.database().ref(`/users/${currentUser.uid}/${id}`)
                            .set({
                                displayName: username,
                                photoURL: currentUser.photoURL
                            })
                    })
            })
            .then(()=> {
                dispatch({
                    type: EDIT_PROFILE_SUCCESS
                })
                dispatch({
                    type: LOGIN_USER_SUCCESS,
                    payload: currentUser
                })
            })
            .catch((error) => {
                console.log(error);
                dispatch({
                    type: EDIT_PROFILE_FAIL,
                    payload: error.message
                })      
            }) 
        }    
    }
}