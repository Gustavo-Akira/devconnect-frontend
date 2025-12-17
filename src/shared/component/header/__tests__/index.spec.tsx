import { vi, type Mock } from 'vitest';
vi.mock('../../../hooks/useUserInfo', () => ({ useUserInfo: vi.fn() }));

import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@emotion/react';
import { Header } from '../index';
import { theme } from '../../../../app/theme';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import { useAuth } from '../../../context/auth/authContext';

vi.mock('../../../context/auth/authContext');

describe('Header Component', () => {
  beforeEach(() => {
    (useAuth as Mock).mockReturnValue({
      user: null,
      loading: false,
      isAuthenticated: false,
      login: vi.fn(),
      logout: vi.fn(),
    });
  });

  it('should toggle the navigation menu', () => {
    render(
      <MemoryRouter>
        <ThemeProvider theme={theme}>
          <Header />
        </ThemeProvider>
      </MemoryRouter>,
    );

    expect(screen.getByTestId('menu-closed')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('header'));

    expect(screen.getByTestId('menu-open')).toBeInTheDocument();
  });

  it('should display auth links when not authenticated', () => {
    render(
      <MemoryRouter>
        <ThemeProvider theme={theme}>
          <Header />
        </ThemeProvider>
      </MemoryRouter>,
    );

    expect(screen.getByText('Signin')).toBeInTheDocument();
    expect(screen.getByText('Signup')).toBeInTheDocument();
  });
});
