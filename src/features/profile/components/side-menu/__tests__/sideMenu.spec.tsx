// SideMenu.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import { SideMenu } from '../sideMenu';
import { ThemeProvider } from '@emotion/react';
import { theme } from '../../../../../app/theme';
import { PROFILE_PATHS } from '../../../route';
import { vi } from 'vitest';
import { AuthProvider } from '../../../../../shared/context/auth/authContext';
const renderWithTheme = () => {
  return render(
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <SideMenu />
      </AuthProvider>
    </ThemeProvider>,
  );
};

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async (actual) => ({
  ...(await actual()),
  useNavigate: () => mockNavigate,
}));
vi.mock('../../../../../shared/infra/services/auth/authService', () => ({
  logout: () => Promise.resolve(),
}));

describe('SideMenu', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  it('should render profile image', () => {
    renderWithTheme();
    const img = screen.getByAltText('profileImage');
    expect(img).toHaveAttribute('src', '/src/shared/assets/images/profile.png');
    expect(img).toHaveStyle('border-radius: 100%');
  });

  it('should render user name', () => {
    renderWithTheme();
    expect(screen.getByText('Gustavo Akira Uekita')).toBeInTheDocument();
  });

  it('should render menu links', () => {
    renderWithTheme();
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
    expect(screen.getByText('Exit')).toBeInTheDocument();
  });

  it('should render account icon', () => {
    renderWithTheme();
    expect(screen.getByTitle('account')).toBeInTheDocument();
  });
  it('should render projects icon', () => {
    renderWithTheme();
    expect(screen.getByTitle('projects')).toBeInTheDocument();
  });
  it('should render exit icon', () => {
    renderWithTheme();
    expect(screen.getByTitle('exit')).toBeInTheDocument();
  });

  it("should call navigate function when 'Profile' link is clicked", () => {
    renderWithTheme();
    const profileLink = screen.getByText('Profile');
    profileLink.click();
    expect(mockNavigate).toHaveBeenCalledWith(PROFILE_PATHS.PROFILE);
  });

  it("should call navigate function when 'Projects' link is clicked", () => {
    renderWithTheme();
    const projectLink = screen.getByText('Projects');
    projectLink.click();
    expect(mockNavigate).toHaveBeenCalledWith(PROFILE_PATHS.PROFILE_PROJECTS);
  });

  it("should call logout and navigate function when 'Exit' link is clicked", async () => {
    renderWithTheme();
    const exitLink = screen.getByText('Exit');
    exitLink.click();
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });
});
