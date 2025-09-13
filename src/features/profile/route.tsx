import type { RouteObject } from 'react-router-dom';
import { ProfileLayout } from './components/layout/layout';
import { PrivateRoute } from '../../shared/component/privateRoute';
import { InfoPage } from './pages/information';
import { AuthProvider } from '../../shared/context/auth/authContext';

export const PROFILE_PATHS = {
  PROFILE: '/profile',
};

export const PROFILE_ROUTE: RouteObject[] = [
  {
    path: PROFILE_PATHS.PROFILE,
    element: (
      <AuthProvider>
        <PrivateRoute>
          <ProfileLayout />
        </PrivateRoute>
      </AuthProvider>
    ),
    children: [
      {
        path: '',
        element: <InfoPage />,
      },
    ],
  },
];
