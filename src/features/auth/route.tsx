import type { RouteObject } from 'react-router-dom';
import { Signup } from './pages/signup';
import { SignIn } from './pages/signin';

export const AUTH_PATHS = {
  SIGNUP: '/auth/signup',
  SIGNIN: '/auth/signin',
};

export const AUTH_ROUTE: RouteObject[] = [
  {
    path: AUTH_PATHS.SIGNUP,
    element: <Signup />,
  },
  {
    path: AUTH_PATHS.SIGNIN,
    element: <SignIn />,
  },
];
