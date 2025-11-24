import { createBrowserRouter } from 'react-router-dom';
import { HOME_ROUTE } from '../features/home/route';
import { AUTH_ROUTE } from '../features/auth/route';
import { PROFILE_ROUTE } from '../features/profile/route';
import { RELATIONS_ROUTE } from '../features/relation/route';

export const router = createBrowserRouter([
  ...HOME_ROUTE,
  ...AUTH_ROUTE,
  ...PROFILE_ROUTE,
  ...RELATIONS_ROUTE,
]);
