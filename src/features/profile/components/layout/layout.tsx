import { SideMenu } from '../side-menu/sideMenu';

export const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div style={{ display: 'flex' }}>
      <SideMenu />
      <div style={{ flex: 1, padding: '20px' }}>{children}</div>
    </div>
  );
};
