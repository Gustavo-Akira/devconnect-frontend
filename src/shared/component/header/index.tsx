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
              <NavLink href="#signin">Signin</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="#signup">Signup</NavLink>
            </NavItem>
          </NavList>
        </Nav>
      </HeaderContent>
    </HeaderContainer>
  );
};
