import { Outlet, type RouteObject } from 'react-router-dom';
import { FriendsPage } from './pages/friend';
import { AuthProvider } from '../../shared/context/auth/authContext';
import { PrivateRoute } from '../../shared/component/privateRoute';
import { RelationPage } from './pages/relation';

export const RELATIONS_PATHS = {
  RELATION: 'relations',
  FRIENDS: 'relations/friends',
};

export const RELATIONS_ROUTE: RouteObject[] = [
  {
    path: RELATIONS_PATHS.RELATION,
    element: (
      <AuthProvider>
        <PrivateRoute>
          <Outlet />
        </PrivateRoute>
      </AuthProvider>
    ),
    children: [
      {
        path: '',
        element: <RelationPage />,
      },
      {
        path: 'friends',
        element: <FriendsPage />,
      },
    ],
  },
];
