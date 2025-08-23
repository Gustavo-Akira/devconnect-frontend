import { createBrowserRouter } from 'react-router-dom';
import { HOME_ROUTE } from '../features/home/route';
import { AUTH_ROUTE } from '../features/auth/route';
export const router = createBrowserRouter([...HOME_ROUTE, ...AUTH_ROUTE]);
