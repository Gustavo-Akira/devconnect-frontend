import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useProfile } from '../useProfile';
import type { User } from '../../../../shared/types/user';

// 🔹 Mock do service
vi.mock('../../../../shared/infra/services/profile/profileService', () => ({
  getProfileById: vi.fn(),
}));

import { getProfileById } from '../../../../shared/infra/services/profile/profileService';

const mockedGetProfileById = vi.mocked(getProfileById);

describe('useProfile hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should not call getProfileById when id is undefined', () => {
    renderHook(() => useProfile());

    expect(mockedGetProfileById).not.toHaveBeenCalled();
  });

  it('should fetch profile and update state on success', async () => {
    const mockUser: User = {
      id: '1',
      name: 'Gustavo',
      email: 'gustavo@email.com',
    } as User;

    mockedGetProfileById.mockResolvedValueOnce(mockUser);

    const { result } = renderHook(() => useProfile('1'));

    // loading inicia como true
    expect(result.current.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.profile).toEqual(mockUser);
    expect(result.current.error).toBeNull();
    expect(mockedGetProfileById).toHaveBeenCalledWith('1');
  });

  it('should handle error when request fails', async () => {
    const error = new Error('Network error');
    mockedGetProfileById.mockRejectedValueOnce(error);

    const { result } = renderHook(() => useProfile('1'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.profile).toBeUndefined();
    expect(result.current.error).toBe(error);
  });

  it('should not update state after unmount', async () => {
    let resolvePromise!: (value: User) => void;

    const promise = new Promise<User>((resolve) => {
      resolvePromise = resolve;
    });

    mockedGetProfileById.mockReturnValueOnce(promise);

    const { unmount } = renderHook(() => useProfile('1'));

    unmount();

    resolvePromise({
      id: '1',
      name: 'Gustavo',
      email: 'gustavo@email.com',
    } as User);

    await Promise.resolve();
  });
});
