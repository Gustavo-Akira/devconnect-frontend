import { Outlet } from 'react-router-dom';
import { SideMenu } from '../side-menu/sideMenu';

export const ProfileLayout = () => {
  return (
    <div style={{ display: 'flex' }}>
      <SideMenu />
      <div style={{ flex: 1, padding: '20px' }}>
        <Outlet />
      </div>
    </div>
  );
};
