import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true,
})

export const login = (email: string, password: string) => {
  API.post('/auth/login', { email, password });
}

export const logout = () => API.get('/auth/logout');

export const getCurrentUser = () => API.get('/auth/current-user');
