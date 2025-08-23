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
import { useNavigate } from 'react-router-dom';
export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

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
              <NavLink href="#signin">Signin</NavLink>
            </NavItem>
            <NavItem>
              <NavLink onClick={() => navigate(AUTH_PATHS.SIGNUP)}>
                Signup
              </NavLink>
            </NavItem>
          </NavList>
        </Nav>
      </HeaderContent>
    </HeaderContainer>
  );
};
