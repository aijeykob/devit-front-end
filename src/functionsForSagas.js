import instance from './components/shared/jwtInterceptor';

const apiUrl = process.env.REACT_APP_API_URL;

export const getPosts = (d) => {
  return instance.post(`${apiUrl}/api/posts/get-all`, { ...d.payload });
};

export const getPost = (d) => {
  return instance.get(`${apiUrl}/api/posts/${d.payload}`);
};

export const createPost = (d) => {
  return instance.post(`${apiUrl}/api/posts`, { ...d.payload });
};

export const updatePost = (d) => {
  return instance.put(`${apiUrl}/api/posts/${d.payload.postId}`, { ...d.payload });
};

export const removePost = (d) => {
  return instance.delete(`${apiUrl}/api/posts/${d.payload}`);
};
