import {
    INIT_EDIT_POST,
    CAPTION_CHANGE,
    SAVE_POST,
    EDIT_POST_FAIL,
    EDIT_POST_SUCCESS
} from '../actions/types'

const INITIAL_STATE = {
    captionEdit: '',
    loading: false,
    error: ''

}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case EDIT_POST_SUCCESS :
            return INITIAL_STATE
        case EDIT_POST_FAIL :
            return { ...state, loading: false, error: action.payload}
        case SAVE_POST :
            return { ...state, loading: true, error: '' }
        case CAPTION_CHANGE :
            return { ...state, captionEdit: action.payload }
        case INIT_EDIT_POST :
            return {...INITIAL_STATE, captionEdit: action.payload }
        default :
            return state
    }
}