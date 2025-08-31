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
export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

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
            <NavItem>
              <NavLink onClick={()=>{router.navigate(AUTH_PATHS.SIGNIN)}}>Signin</NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={() => router.navigate(AUTH_PATHS.SIGNUP)}>
                Signup
              </NavLink>
            </NavItem>
          </NavList>
        </Nav>
      </HeaderContent>
    </HeaderContainer>
  );
};
