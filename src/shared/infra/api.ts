import axios from 'axios';

export const api = axios.create({
  baseURL: import.meta.env?.REACT_APP_BASE_URL_API ?? 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});


export const relationApi = axios.create({
  baseURL:
    import.meta.env?.REACT_APP_BASE_URL_RELATION_API ??
    'http://localhost:8082',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});