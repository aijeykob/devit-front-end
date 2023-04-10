import {put, takeEvery, call, all} from 'redux-saga/effects'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
    getPosts,
    createPost,
    getPost,
    updatePost,
    removePost
} from './functionsForSagas'

export function* workerGetPosts(d, cb) {
    try {
        const response = yield call(getPosts, d);
        const data = response.data;
        yield put({type: 'SET_POSTS', payload: data})
        if (cb) cb()
    } catch (error) {
        toast.error(error.response.data?.message, {
            position: toast.POSITION.TOP_RIGHT
        });

    }
}

export function* workerGetPost(d, cb) {
    try {
        const response = yield call(getPost, d);
        const data = response.data;
        if (cb) cb(data)
    } catch (error) {
        toast.error(error.response.data?.message, {
            position: toast.POSITION.TOP_RIGHT
        });

    }
}

export function* workerCreatePost(d, cb) {

    try {
        yield call(createPost, d);
        if (cb) cb()
    } catch (error) {
        yield put({type: 'CREATE_POST_FAILURE', payload: error.response.data.errors});

    }
}

export function* workerUpdatePost(d, cb) {

    try {
        yield call(updatePost, d);
        if (cb) cb()
    } catch (error) {
        yield put({type: 'EDIT_POST_FAILURE', payload: error.response.data.errors});

    }
}

export function* workerRemovePost(d, cb) {

    try {
        const response = yield call(removePost, d);
        toast.success(response.data?.message)
        if (cb) cb()
    } catch (error) {
        toast.error(error.response.data?.message, {
            position: toast.POSITION.TOP_RIGHT
        });

    }
}

export function* watchGetPosts() {
    yield takeEvery('GET_POSTS', function* (action) {
        yield call(workerGetPosts, action, action.callback);
    });
}

export function* watchGetPost() {
    yield takeEvery('GET_POST', function* (action) {
        yield call(workerGetPost, action, action.callback);
    });
}

export function* watchCreatePost() {
    yield takeEvery('CREATE_POST', function* (action) {
        yield call(workerCreatePost, action, action.callback);
    });
}

export function* watchUpdatePost() {
    yield takeEvery('UPDATE_POST', function* (action) {
        yield call(workerUpdatePost, action, action.callback);
    });
}

export function* watchRemovePost() {
    yield takeEvery('REMOVE_POST', function* (action) {
        yield call(workerRemovePost, action, action.callback);
    });
}

export default function* rootSaga() {
    yield all([
        watchGetPosts(),
        watchCreatePost(),
        watchGetPost(),
        watchUpdatePost(),
        watchRemovePost(),
    ])
}