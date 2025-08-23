import type { RouteObject } from 'react-router-dom';
import { Signup } from './pages/signup';

export const AUTH_PATHS={
  SIGNUP: '/auth/signup',
}

export const AUTH_ROUTE: RouteObject[] = [
  {
    path: AUTH_PATHS.SIGNUP,
    element: <Signup />,
  },
];
