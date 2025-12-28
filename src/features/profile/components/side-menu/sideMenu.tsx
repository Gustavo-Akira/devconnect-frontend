import { Typography } from '@mui/material';
import {
  SideMenuContainer,
  SideMenuLink,
  SideMenuNavBar,
  SideMenuProfileContainer,
} from './styled';
import ProfileImage from '../../../../shared/assets/images/profile.png';
import { AccountCircle, Book, ExitToAppSharp } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { PROFILE_PATHS } from '../../route';
import { logout } from '../../../../shared/infra/services/auth/authService';
import { useAuth } from '../../../../shared/context/auth/authContext';

export const SideMenu = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  return (
    <SideMenuContainer>
      <SideMenuProfileContainer>
        <img
          src={ProfileImage}
          style={{
            width: '20vh',
            height: 'auto',
            borderRadius: '100%',
            border: '1px solid black',
            marginBottom: '20px',
          }}
          role="img"
          alt="profileImage"
        />
        <Typography variant="h5">{auth.user?.name}</Typography>
      </SideMenuProfileContainer>
      <SideMenuNavBar>
        <SideMenuLink onClick={() => navigate(PROFILE_PATHS.PROFILE)}>
          <AccountCircle titleAccess="account" />
          Profile
        </SideMenuLink>
        <SideMenuLink onClick={() => navigate(PROFILE_PATHS.PROFILE_PROJECTS)}>
          <Book titleAccess="projects" />
          Projects
        </SideMenuLink>
        <SideMenuLink
          onClick={() => {
            logout().then(() => {
              auth.logout();
              navigate('/');
            });
          }}
        >
          <ExitToAppSharp titleAccess="exit" /> Exit
        </SideMenuLink>
      </SideMenuNavBar>
    </SideMenuContainer>
  );
};
