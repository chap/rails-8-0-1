import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000/posts',
});

export const getPosts = () => API.get('/');
export const getPost = (id) => API.get(`/${id}`);
export const createPost = (post) => API.post('/', post);
export const updatePost = (id, post) => API.put(`/${id}`, post);
export const deletePost = (id) => API.delete(`/${id}`);
