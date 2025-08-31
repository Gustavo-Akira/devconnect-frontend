// SideMenu.test.tsx
import { render, screen } from '@testing-library/react';
import { SideMenu } from '../sideMenu';
import { ThemeProvider } from '@emotion/react';
import { theme } from '../../../../../app/theme';

const renderWithTheme = () => {
  return render(
    <ThemeProvider theme={theme}>
      <SideMenu />
    </ThemeProvider>,
  );
};
describe('SideMenu', () => {
  it('deve renderizar a imagem de perfil', () => {
    renderWithTheme();
    const img = screen.getByAltText('profileImage');
    expect(img).toHaveAttribute('src', '/src/shared/assets/images/profile.png');
    expect(img).toHaveStyle('border-radius: 100%');
  });

  it('deve renderizar o nome do usuário', () => {
    renderWithTheme();
    expect(screen.getByText('Gustavo Akira Uekita')).toBeInTheDocument();
  });

  it('deve renderizar os links do menu', () => {
    renderWithTheme();
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Exit')).toBeInTheDocument();
  });

  it('deve renderizar o icone do link de profile', () => {
    renderWithTheme();
    expect(screen.getByTitle('account')).toBeInTheDocument();
  });
  it('deve renderizar o icone do link de profile', () => {
    renderWithTheme();
    expect(screen.getByTitle('projects')).toBeInTheDocument();
  });
  it('deve renderizar o icone do link de profile', () => {
    renderWithTheme();
    expect(screen.getByTitle('exit')).toBeInTheDocument();
  });
});
