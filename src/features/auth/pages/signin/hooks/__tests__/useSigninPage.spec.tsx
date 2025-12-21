import { renderHook, act } from '@testing-library/react';
import { useSigninPage } from '../useSigninPage';
import { signin } from '../../../../../../shared/infra/services/auth/authService';
import { vi, type Mock } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { useAuth } from '../../../../../../shared/context/auth/authContext';
import { useNotification } from '../../../../../../shared/context/notification/notificationContext';

vi.mock('../../../../../../shared/infra/services/auth/authService');
vi.mock('../../../../../../shared/context/auth/authContext');
vi.mock('../../../../../../shared/context/notification/notificationContext');
describe('useSigninPage', () => {
  const mockSignin = signin as Mock;
  const loginMock = vi.fn();
  (useAuth as Mock).mockReturnValue({
    login: loginMock,
    user: null,
    loading: false,
    isAuthenticated: false,
    logout: vi.fn(),
  });

  const mockShowNotification = vi.fn();
  (useNotification as Mock).mockReturnValue({ showNotification: mockShowNotification });

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
    expect(loginMock).toHaveBeenCalled();
    expect(mockShowNotification).toHaveBeenCalledWith('Login realizado com sucesso!', 'success');
  });

  it('sets error when email or password is missing', () => {
    const { result } = setup();

    act(() => {
      result.current.actions.handleSignIn();
    });

    expect(result.current.state.error).toBe('Email e senha são obrigatórios.');
  });

  it('handles signin failure and sets error', async () => {
    mockSignin.mockRejectedValueOnce(new Error('fail'));

    const { result } = setup();

    act(() => {
      result.current.actions.setEmail('fail@example.com');
      result.current.actions.setPassword('wrong');
    });

    await act(async () => {
      await result.current.actions.handleSignIn();
    });

    expect(result.current.state.error).toBe(
      'Falha no login. Verifique suas credenciais e tente novamente.',
    );
    expect(mockShowNotification).not.toHaveBeenCalled();
  });
});
