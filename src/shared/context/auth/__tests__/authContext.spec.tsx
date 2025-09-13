import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, type Mock } from 'vitest';
import { AuthProvider, useAuth } from '../authContext';
import { useUserInfo } from '../../../hooks/useUserInfo';
import type { User } from '../../../types/user';

vi.mock('../../../hooks/useUserInfo', () => ({
  useUserInfo: vi.fn(),
}));

const Consumer = () => {
  const { user, loading, isAuthenticated } = useAuth();
  return (
    <div>
      <div data-testid="user">{user ? user.name : 'no-user'}</div>
      <div data-testid="loading">{loading ? 'loading' : 'not-loading'}</div>
      <div data-testid="auth">{isAuthenticated ? 'yes' : 'no'}</div>
    </div>
  );
};

describe('AuthProvider', () => {
  it('should render user name and yes when authenticated ', () => {
    (useUserInfo as Mock).mockReturnValue({
      user: { id: '1', name: 'Gustavo' } as User,
      loading: false,
    });

    render(
      <AuthProvider>
        <Consumer />
      </AuthProvider>,
    );

    expect(screen.getByTestId('user').textContent).toBe('Gustavo');
    expect(screen.getByTestId('loading').textContent).toBe('not-loading');
    expect(screen.getByTestId('auth').textContent).toBe('yes');
  });

  it('should render no-user and no without user', () => {
    (useUserInfo as Mock).mockReturnValue({
      user: null,
      loading: false,
    });

    render(
      <AuthProvider>
        <Consumer />
      </AuthProvider>,
    );

    expect(screen.getByTestId('user').textContent).toBe('no-user');
    expect(screen.getByTestId('loading').textContent).toBe('not-loading');
    expect(screen.getByTestId('auth').textContent).toBe('no');
  });

  it('should render when is loading', () => {
    (useUserInfo as Mock).mockReturnValue({
      user: null,
      loading: true,
    });

    render(
      <AuthProvider>
        <Consumer />
      </AuthProvider>,
    );

    expect(screen.getByTestId('loading').textContent).toBe('loading');
    expect(screen.getByTestId('auth').textContent).toBe('no');
  });

  it('should thrown error when is used outside provider', () => {
    const Thrower = () => {
      useAuth();
      return null;
    };

    expect(() => render(<Thrower />)).toThrow(
      'useAuth must be used within AuthProvider',
    );
  });
});
