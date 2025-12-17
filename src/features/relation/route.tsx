import { Outlet, type RouteObject } from 'react-router-dom';
import { FriendsPage } from './pages/friend';
import { PrivateRoute } from '../../shared/component/privateRoute';
import { RelationPage } from './pages/relation';

export const RELATIONS_PATHS = {
  RELATION: '/relations',
  FRIENDS: '/relations/friends',
};

export const RELATIONS_ROUTE: RouteObject[] = [
  {
    path: RELATIONS_PATHS.RELATION,
    element: (
      <PrivateRoute>
        <Outlet />
      </PrivateRoute>
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
