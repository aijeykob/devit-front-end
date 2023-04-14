export const GET_POSTS = 'GET_POSTS';
export const GET_POST = 'GET_POST';
export const EDIT_POST_FAILURE = 'EDIT_POST_FAILURE';
export const CREATE_POST = 'CREATE_POST';
export const UPDATE_POST = 'UPDATE_POST';
export const REMOVE_POST = 'REMOVE_POST';
export const SET_POSTS = 'SET_POSTS';
export const CREATE_POST_FAILURE = 'CREATE_POST_FAILURE';
export const EDIT_POST_CLEAR_ERRORS = 'EDIT_POST_CLEAR_ERRORS';

export const getPosts = (data, callback = null) => ({
  type: GET_POSTS,
  payload: data,
  callback,
});
export const getPost = (data, callback = null) => ({
  type: GET_POST,
  payload: data,
  callback,
});
export const createPost = (data, callback = null) => ({
  type: CREATE_POST,
  payload: data,
  callback,
});
export const updatePost = (data, callback = null) => ({
  type: UPDATE_POST,
  payload: data,
  callback,
});

export const removePost = (data, callback = null) => ({
  type: REMOVE_POST,
  payload: data,
  callback,
});
export const editPostClearErrors = () => ({
  type: EDIT_POST_CLEAR_ERRORS,
});
