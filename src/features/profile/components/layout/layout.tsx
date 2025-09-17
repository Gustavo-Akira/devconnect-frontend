import { Outlet } from 'react-router-dom';
import { SideMenu } from '../side-menu/sideMenu';

export const ProfileLayout = () => {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <SideMenu />
      <div
        style={{
          width: '1px',
          background: '#ccc',
          alignSelf: 'stretch',
        }}
        aria-hidden="true"
      />
      <div style={{ flex: 1, padding: '20px' }}>
        <Outlet />
      </div>
    </div>
  );
};
