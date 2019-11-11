import firebase from '@firebase/app'
import '@firebase/database'

import {
    INIT_EDIT_POST,
    SAVE_POST,
    EDIT_POST_FAIL,
    EDIT_POST_SUCCESS,
    CAPTION_CHANGE
} from './types'

export const initEditPost = ({ caption }) => {
    return {
        type: INIT_EDIT_POST,
        payload: caption
    }
}

export const inputEditCaptionChange = (caption) => {
    return {
        type: CAPTION_CHANGE,
        payload: caption
    }
    
}

export const saveEditPost = ({id, caption, imageURL, userId}) => {
    return (dispatch) => {
        dispatch({
            type: SAVE_POST
        })

        firebase.database().ref(`/posts/${id}`).set({
            caption: caption,
            imageURL: imageURL,
            userId: userId
        })
        .then(() => {
            dispatch({
                type: EDIT_POST_SUCCESS
            })
        })
        .catch((err) => {
            dispatch({
                type: EDIT_POST_FAIL,
                payload: err.message
            })
        })

    }
}


