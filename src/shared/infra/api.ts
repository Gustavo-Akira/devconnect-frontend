import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env?.REACT_APP_BASE_URL_API ?? 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});
