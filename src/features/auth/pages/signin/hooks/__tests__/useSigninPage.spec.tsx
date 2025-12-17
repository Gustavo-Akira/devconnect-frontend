import { renderHook, act } from '@testing-library/react';
import { useSigninPage } from '../useSigninPage';
import { signin } from '../../../../../../shared/infra/services/auth/authService';
import { vi, type Mock } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { useAuth } from '../../../../../../shared/context/auth/authContext';

vi.mock('../../../../../../shared/infra/services/auth/authService');
vi.mock('../../../../../../shared/context/auth/authContext');
describe('useSigninPage', () => {
  const mockSignin = signin as Mock;
  (useAuth as Mock).mockReturnValue({
    login: vi.fn(),
    user: null,
    loading: false,
    isAuthenticated: false,
    logout: vi.fn(),
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const setup = () =>
    renderHook(() => useSigninPage(), {
      wrapper: ({ children }) => <MemoryRouter>{children}</MemoryRouter>,
    });

  it('deve navegar após login bem-sucedido', async () => {
    mockSignin.mockResolvedValueOnce({ token: 'fake-token' });

    const { result } = setup();

    act(() => {
      result.current.actions.setEmail('test@example.com');
      result.current.actions.setPassword('123456');
    });

    await act(async () => {
      await result.current.actions.handleSignIn();
    });

    expect(result.current.state.error).toBeNull();
  });
});
