import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { useProfileEdit } from '../useProfileEdit';
import { useAuth } from '../../../../../../shared/context/auth/authContext';
import { useNavigate } from 'react-router-dom';
import { AUTH_PATHS } from '../../../../../auth/route';
import type { User } from '../../../../../../shared/types/user';
import * as profileService from '../../../../../../shared/infra/services/profile/profileService';

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

  it('should call updateProfile and handle success', async () => {
    (useAuth as Mock).mockReturnValue({ user: mockUser });
    const updateProfileMock = vi
      .spyOn(profileService, 'updateProfile')
      .mockResolvedValueOnce(mockUser);

    const { result } = renderHook(() => useProfileEdit());

    await act(async () => {
      await result.current.actions.handleProfileUpdate();
    });

    expect(updateProfileMock).toHaveBeenCalled();
    expect(result.current.state.error).toBeUndefined();
    expect(result.current.state.loading).toBe(false);
  });

  it('should set error when updateProfile throws', async () => {
    (useAuth as Mock).mockReturnValue({ user: mockUser });
    const updateProfileMock = vi
      .spyOn(profileService, 'updateProfile')
      .mockRejectedValueOnce(new Error('Update failed'));

    const { result } = renderHook(() => useProfileEdit());

    await act(async () => {
      await result.current.actions.handleProfileUpdate();
    });

    expect(updateProfileMock).toHaveBeenCalled();
    expect(result.current.state.error).toBe('Update failed');
    expect(result.current.state.loading).toBe(false);
  });
});
