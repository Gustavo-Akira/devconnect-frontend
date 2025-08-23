import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { HeaderContainer, Nav, NavList, NavItem, NavLink, Logo, HeaderContent, } from './styled';
export const Header = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    return (_jsx(HeaderContainer, { role: "header", onClick: () => setMenuOpen(!menuOpen), children: _jsxs(HeaderContent, { children: [_jsx(Logo, { children: "Logo" }), _jsx(Nav, { role: "navigation", open: menuOpen, "data-testid": menuOpen ? 'menu-open' : 'menu-closed', children: _jsxs(NavList, { children: [_jsx(NavItem, { children: _jsx(NavLink, { href: "#signin", children: "Signin" }) }), _jsx(NavItem, { children: _jsx(NavLink, { href: "#signup", children: "Signup" }) })] }) })] }) }));
};
