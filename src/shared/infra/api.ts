import axios from 'axios';

export const api = axios.create({
  baseURL: (import.meta as any).env?.REACT_APP_BASE_URL_API ??
  process.env.REACT_APP_BASE_URL_API ??
  'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});
