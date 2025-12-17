import type { RouteObject } from 'react-router-dom';
import { ProfileLayout } from './components/layout/layout';
import { PrivateRoute } from '../../shared/component/privateRoute';
import { InfoPage } from './pages/information';
import { EditProfilePage } from './pages/profile-edit';
import { ProjectsPage } from './pages/projects';

export const PROFILE_PATHS = {
  PROFILE: '/profile',
  PROFILE_EDIT: '/profile/edit',
  PROFILE_PROJECTS: '/profile/projects',
};

export const PROFILE_ROUTE: RouteObject[] = [
  {
    path: PROFILE_PATHS.PROFILE,
    element: (
      <PrivateRoute>
        <ProfileLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: '',
        element: <InfoPage />,
      },
      {
        path: 'edit',
        element: <EditProfilePage />,
      },
      {
        path: 'projects',
        element: <ProjectsPage />,
      },
    ],
  },
];
