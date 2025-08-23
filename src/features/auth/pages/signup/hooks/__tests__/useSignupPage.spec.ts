import { renderHook, act } from '@testing-library/react';
import { useSignupPage } from '../useSignupPage';
import { signup } from '../../../../../../shared/infra/services/auth/authService';
import type { FormData } from '../../interface';
import {vi, type Mock} from 'vitest';
vi.mock('../../../../../../shared/infra/services/auth/authService', () => ({
  signup: vi.fn(),
}));

const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});

describe('useSignupPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with correct default state', () => {
    const { result } = renderHook(() => useSignupPage());

    expect(result.current.state.activeStep).toBe(0);
    expect(result.current.state.steps).toEqual([
      'Informações Pessoais',
      'Dados de Acesso',
      'Confirmação',
    ]);
    expect(result.current.state.formData.name).toBe('');
  });

  it('should go to next and back steps', () => {
    const { result } = renderHook(() => useSignupPage());

    act(() => result.current.actions.handleNext());
    expect(result.current.state.activeStep).toBe(1);

    act(() => result.current.actions.handleBack());
    expect(result.current.state.activeStep).toBe(0);
  });

  it('should alert if passwords do not match', async () => {
    const { result } = renderHook(() => useSignupPage());

    act(() => {
      result.current.actions.setFormData((prev: FormData) => ({
        ...prev,
        name: 'John Doe',
        email: 'john@example.com',
        password: '123456',
        confirmPassword: '654321', // mismatch,
        stack: [],
      }));
    });

    await act(async () => {
      await result.current.actions.handleSignup();
    });

    expect(alertMock).toHaveBeenCalledWith('As senhas não coincidem.');
    expect(signup).not.toHaveBeenCalled();
  });

  it('should call signup with correct data when passwords match', async () => {
    (signup as Mock).mockResolvedValue({ success: true });

    const { result } = renderHook(() => useSignupPage());

    act(() => {
      result.current.actions.setFormData((prev: FormData) => ({
        ...prev,
        name: 'John Doe',
        email: 'john@example.com',
        password: '123456',
        confirmPassword: '123456',
        address: 'Main St',
        number: '123',
        city: 'NY',
        state: 'NY',
        zipCode: '10001',
        country: 'USA',
        githubLink: 'https://github.com/john',
        linkedinLink: 'https://linkedin.com/in/john',
        bio: 'Developer',
        stack: [],
      }));
    });

    await act(async () => {
      await result.current.actions.handleSignup();
    });

    expect(signup).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'John Doe',
        email: 'john@example.com',
        password: '123456',
        street: 'Main St 123',
      }),
    );
  });

  it('should handle signup error gracefully', async () => {
    (signup as Mock).mockRejectedValue(new Error('API Error'));

    const { result } = renderHook(() => useSignupPage());

    act(() => {
      result.current.actions.setFormData((prev: FormData) => ({
        ...prev,
        name: 'Jane Doe',
        email: 'jane@example.com',
        password: 'password',
        confirmPassword: 'password',
        stack: [],
      }));
    });

    await act(async () => {
      await result.current.actions.handleSignup();
    });

    expect(alertMock).toHaveBeenCalledWith(
      'Ocorreu um erro ao tentar se cadastrar. Tente novamente mais tarde.',
    );
  });
});
