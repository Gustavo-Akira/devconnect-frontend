import { vi, type Mock } from 'vitest';
import { render, screen } from '@testing-library/react';
import { useAuth } from '../../../context/auth/authContext';
import { PrivateRoute } from '..';
import { MemoryRouter } from 'react-router-dom';

vi.mock('../../../context/auth/authContext', () => ({
  useAuth: vi.fn(),
}));

describe('Private Route', () => {
  const mockUseAuth = useAuth as Mock;

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('when isAuthenticated is false should go to login page', () => {
    mockUseAuth.mockReturnValue({ isAuthenticated: false, loading: false });

    render(
      <MemoryRouter>
        <PrivateRoute>
          <div>Conteúdo privado</div>
        </PrivateRoute>
      </MemoryRouter>,
    );

    expect(screen.queryByText('Conteúdo privado')).not.toBeInTheDocument();
  });

  it('when loading is true should be loading text in screen', () => {
    mockUseAuth.mockReturnValue({ isAuthenticated: false, loading: true });

    render(
      <MemoryRouter>
        <PrivateRoute>
          <div>Conteúdo privado</div>
        </PrivateRoute>
      </MemoryRouter>,
    );

    expect(screen.queryByText('Loading...')).toBeInTheDocument();
    expect(screen.queryByText('Conteúdo privado')).not.toBeInTheDocument();
  });

  it('when loading is false and isAuthenticated true should be showing component', () => {
    mockUseAuth.mockReturnValue({ isAuthenticated: true, loading: false });

    render(
      <MemoryRouter>
        <PrivateRoute>
          <div>Conteúdo privado</div>
        </PrivateRoute>
      </MemoryRouter>,
    );

    expect(screen.queryByText('Loading...')).not.toBeInTheDocument();
    expect(screen.queryByText('Conteúdo privado')).toBeInTheDocument();
  });
});
