import {
    SET_POSTS,
    CREATE_POST_FAILURE,
    EDIT_POST_FAILURE,
    EDIT_POST_CLEAR_ERRORS
} from '../actions/index';

const initState = {
    posts: {
        total: 0,
        page: 1,
        limit: 10,
        data: [],
        allCreators: [],
        errors: null
    },
    editPost: {
        errors: null
    }
};

const reducer = (state = initState, {type, payload}) => {

    switch (type) {
        case SET_POSTS:
            return {
                ...state,
                posts: payload,
            };
        case CREATE_POST_FAILURE:
            return {
                ...state,
                posts: {
                    ...state.posts,
                    errors: payload
                },
            };
        case EDIT_POST_FAILURE:
            return {
                ...state,
                editPost: {
                    ...state.editPost,
                    errors: payload
                },
            };
        case EDIT_POST_CLEAR_ERRORS:
            return {
                ...state,
                editPost: {
                    ...state.editPost,
                    errors: null
                },
            };
        default:
            return state
    }
};
export default reducer