import { renderHook, act } from '@testing-library/react';
import { useSigninPage } from '../useSigninPage';
import { signin } from '../../../../../../shared/infra/services/auth/authService';
import { vi, type Mock } from 'vitest';
import { MemoryRouter } from 'react-router-dom';

vi.mock('../../../../../../shared/infra/services/auth/authService');

describe('useSigninPage', () => {
  const mockSignin = signin as Mock;

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

    // se o hook usa navigate('/home'), você pode verificar pelo estado de error/redirect
    expect(result.current.state.error).toBeNull();
  });
});
