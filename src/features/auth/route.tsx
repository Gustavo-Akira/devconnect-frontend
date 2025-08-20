import type { RouteObject } from 'react-router-dom';
import { Signup } from './pages/signup';

export const AUTH_ROUTE: RouteObject[] = [
  {
    path: '/auth/signup',
    element: <Signup />,
  },
];
