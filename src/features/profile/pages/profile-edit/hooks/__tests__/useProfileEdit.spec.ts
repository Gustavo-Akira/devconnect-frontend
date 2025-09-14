import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { useProfileEdit } from '../useProfileEdit';
import { useAuth } from '../../../../../../shared/context/auth/authContext';
import { useNavigate } from 'react-router-dom';
import { AUTH_PATHS } from '../../../../../auth/route';
import type { User } from '../../../../../../shared/types/user';

vi.mock('../../../../../../shared/context/auth/authContext');
vi.mock('react-router-dom', async () => {
  const actual =
    await vi.importActual<typeof import('react-router-dom')>(
      'react-router-dom',
    );
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe('useProfileEdit', () => {
  const mockNavigate = vi.fn();

  const mockUser: User = {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    githubLink: 'https://github.com/johndoe',
    linkedinLink: 'https://linkedin.com/in/johndoe',
    stack: ['React'],
    bio: 'Dev',
    address: {
      zipCode: '12345-678',
      street: 'Rua A',
      city: 'São Paulo',
      state: 'SP',
      country: 'Brasil',
    },
    isActive: true,
  };

  beforeEach(() => {
    vi.resetAllMocks();
    (useNavigate as Mock).mockReturnValue(mockNavigate);
  });

  it('should navigate to signup if user is null', () => {
    (useAuth as Mock).mockReturnValue({ user: null });

    renderHook(() => useProfileEdit());

    expect(mockNavigate).toHaveBeenCalledWith(AUTH_PATHS.SIGNUP);
  });

  it('should set profileData with user when available', () => {
    (useAuth as Mock).mockReturnValue({ user: mockUser });

    const { result } = renderHook(() => useProfileEdit());

    expect(result.current.state.profileData).toEqual(mockUser);
  });

  it('should change a root property', () => {
    (useAuth as Mock).mockReturnValue({ user: mockUser });

    const { result } = renderHook(() => useProfileEdit());

    act(() => {
      result.current.actions.changeProperty('name', 'Jane Doe');
    });

    expect(result.current.state.profileData?.name).toBe('Jane Doe');
  });

  it('should change an address property', () => {
    (useAuth as Mock).mockReturnValue({ user: mockUser });

    const { result } = renderHook(() => useProfileEdit());

    act(() => {
      result.current.actions.changeProperty('city', 'Rio de Janeiro');
    });

    expect(result.current.state.profileData?.address.city).toBe(
      'Rio de Janeiro',
    );
  });

  it('should reset profileData to original user', () => {
    (useAuth as Mock).mockReturnValue({ user: mockUser });

    const { result } = renderHook(() => useProfileEdit());

    act(() => {
      result.current.actions.changeProperty('name', 'Jane Doe');
    });
    expect(result.current.state.profileData?.name).toBe('Jane Doe');

    act(() => {
      result.current.actions.handleReset();
    });
    expect(result.current.state.profileData?.name).toBe('John Doe');
  });

  it('should set error when handleProfileUpdate is called', () => {
    (useAuth as Mock).mockReturnValue({ user: mockUser });

    const { result } = renderHook(() => useProfileEdit());

    act(() => {
      result.current.actions.handleProfileUpdate();
    });

    expect(result.current.state.error).toBe('Not implemented yet');
    expect(result.current.state.loading).toBe(false);
  });
});
