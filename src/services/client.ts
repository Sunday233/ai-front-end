import axios from 'axios';

export const serviceClient = axios.create({
  baseURL: '/',
  timeout: 8000,
});

serviceClient.interceptors.response.use(
  (response) => response.data,
  (error) => Promise.reject(error)
);
