import { Typography } from '@mui/material';
import {
  SideMenuContainer,
  SideMenuLink,
  SideMenuNavBar,
  SideMenuProfileContainer,
} from './styled';
import ProfileImage from '../../../../shared/assets/images/profile.png';
import { AccountCircle, Book, ExitToAppSharp } from '@mui/icons-material';

export const SideMenu = () => {
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
        <Typography variant="h5">Gustavo Akira Uekita</Typography>
      </SideMenuProfileContainer>
      <SideMenuNavBar>
        <SideMenuLink>
          <AccountCircle titleAccess="account" />
          Profile
        </SideMenuLink>
        <SideMenuLink>
          <Book titleAccess="projects" />
          Projects
        </SideMenuLink>
        <SideMenuLink>
          <ExitToAppSharp titleAccess="exit" /> Exit
        </SideMenuLink>
      </SideMenuNavBar>
    </SideMenuContainer>
  );
};
