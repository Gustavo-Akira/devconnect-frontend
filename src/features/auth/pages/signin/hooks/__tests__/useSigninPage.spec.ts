import { renderHook, act } from '@testing-library/react';
import { useSigninPage } from '../useSigninPage';
import { signin } from '../../../../../../shared/infra/services/auth/authService';
import { vi, type Mock } from 'vitest';

vi.mock('../../../../../../shared/infra/services/auth/authService');

describe('useSigninPage', () => {
  const mockSignin = signin as Mock;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve atualizar email e senha', () => {
    const { result } = renderHook(() => useSigninPage());

    act(() => {
      result.current.actions.setEmail('test@example.com');
      result.current.actions.setPassword('123456');
    });

    expect(result.current.state.email).toBe('test@example.com');
    expect(result.current.state.password).toBe('123456');
  });

  it('deve exibir erro se email ou senha não forem preenchidos', () => {
    const { result } = renderHook(() => useSigninPage());

    act(() => {
      result.current.actions.handleSignIn();
    });

    expect(result.current.state.error).toBe('Email e senha são obrigatórios.');
  });

  it('deve realizar login com sucesso', async () => {
    mockSignin.mockResolvedValueOnce({ token: 'fake-token' });

    const { result } = renderHook(() => useSigninPage());

    act(() => {
      result.current.actions.setEmail('test@example.com');
      result.current.actions.setPassword('123456');
    });

    await act(async () => {
      await result.current.actions.handleSignIn();
    });

    expect(mockSignin).toHaveBeenCalledWith('test@example.com', '123456');
    expect(result.current.state.error).toBeNull();
    expect(result.current.state.loading).toBe(false);
  });

  it('deve lidar com erro no login', async () => {
    const fakeError = new Error('Invalid credentials');
    mockSignin.mockRejectedValueOnce(fakeError);

    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    const { result } = renderHook(() => useSigninPage());

    act(() => {
      result.current.actions.setEmail('test@example.com');
      result.current.actions.setPassword('wrongpass');
    });

    await act(async () => {
      await result.current.actions.handleSignIn();
    });

    expect(mockSignin).toHaveBeenCalledWith('test@example.com', 'wrongpass');
    expect(result.current.state.error).toBe(
      'Falha no login. Verifique suas credenciais e tente novamente.',
    );
    expect(result.current.state.loading).toBe(false);

    consoleSpy.mockRestore();
  });
});
