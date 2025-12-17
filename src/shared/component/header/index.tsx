import { useState } from 'react';
import {
  HeaderContainer,
  Nav,
  NavList,
  NavItem,
  NavLink,
  Logo,
  HeaderContent,
} from './styled';
import { AUTH_PATHS } from '../../../features/auth/route';
import { router } from '../../routes';
import { RELATIONS_PATHS } from '../../../features/relation/route';
import { PROFILE_PATHS } from '../../../features/profile/route';
import { useAuth } from '../../context/auth/authContext';
export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useAuth();
  return (
    <HeaderContainer role="header" onClick={() => setMenuOpen(!menuOpen)}>
      <HeaderContent>
        <Logo>Logo</Logo>
        <Nav
          role="navigation"
          open={menuOpen}
          data-testid={menuOpen ? 'menu-open' : 'menu-closed'}
        >
          <NavList>
            {user == null && (
              <>
                <NavItem>
                  <NavLink
                    onClick={() => {
                      router.navigate(AUTH_PATHS.SIGNIN);
                    }}
                  >
                    Signin
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink onClick={() => router.navigate(AUTH_PATHS.SIGNUP)}>
                    Signup
                  </NavLink>
                </NavItem>
              </>
            )}
            {user != null && (
              <>
                <NavItem>
                  <NavLink
                    onClick={() => {
                      router.navigate(PROFILE_PATHS.PROFILE);
                    }}
                  >
                    Profile
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    onClick={() => {
                      router.navigate(RELATIONS_PATHS.FRIENDS);
                    }}
                  >
                    Friends
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    onClick={() => {
                      router.navigate(RELATIONS_PATHS.RELATION);
                    }}
                  >
                    Relations
                  </NavLink>
                </NavItem>
              </>
            )}
          </NavList>
        </Nav>
      </HeaderContent>
    </HeaderContainer>
  );
};
