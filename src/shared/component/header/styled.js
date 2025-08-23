import styled from '@emotion/styled';
export const HeaderContainer = styled.header `
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;

  font-family: ${({ theme }) => theme.typography.fontFamily};

  background: ${({ theme }) => theme.palette.primary.main};
  color: ${({ theme }) => theme.palette.primary.contrastText};
  padding: ${({ theme }) => theme.spacing(4)} ${({ theme }) => theme.spacing(4)};
  display: flex;
  justify-content: center; /* centraliza o conteúdo */
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    padding-left: 0;
    padding-right: 0;
  }
`;
export const HeaderContent = styled.div `
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1200px;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;
export const Logo = styled.div `
  font-weight: bold;
  font-size: 1.5rem;
`;
export const Nav = styled.nav `
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    position: fixed;
    top: 90px;
    left: 0;
    right: 0;
    width: 100%;
    max-width: 100%;
    background: ${({ theme }) => theme.palette.primary.main};
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing(2)};
    padding: ${({ theme }) => theme.spacing(2)} 0;
    transition: transform 0.3s ease;
    transform: ${({ open }) => (open ? 'translateY(0)' : 'translateY(-200%)')};
    overflow-x: hidden; /* evita que ultrapasse a tela */
  }
`;
export const NavList = styled.ul `
  display: flex;
  gap: ${({ theme }) => theme.spacing(3)};
  list-style: none;
  padding: 0;
  margin: 0;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    align-items: center;
  }
`;
export const NavItem = styled.li ``;
export const NavLink = styled.a `
  color: ${({ theme }) => theme.palette.primary.contrastText};
  text-decoration: none;
  padding: ${({ theme }) => theme.spacing(1)} ${({ theme }) => theme.spacing(2)};
  border-radius: 6px;
  transition:
    background 0.2s ease,
    transform 0.15s ease;

  &:hover {
    background: ${({ theme }) => theme.palette.primary.light};
    transform: translateY(-1px);
  }
`;
