import type { RouteObject } from 'react-router-dom';
import { ProfileLayout } from './components/layout/layout';

export const PROFILE_PATHS = {
  PROFILE: '/profile',
};

export const PROFILE_ROUTE: RouteObject[] = [
  {
    path: PROFILE_PATHS.PROFILE,
    element: <ProfileLayout children={undefined} />,
    children: [
      {
        path: '',
        element: <div>Profile Home</div>,
      },
    ],
  },
];
