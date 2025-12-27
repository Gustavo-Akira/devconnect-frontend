import { renderHook, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useProfile } from '../useProfile';
import type { User } from '../../../../shared/types/user';
import type { ProjectResponse } from '../../../../shared/infra/services/projects/interface';
import { getProfileById } from '../../../../shared/infra/services/profile/profileService';
import { getProjectsByDevProfileId } from '../../../../shared/infra/services/projects/projectService';

vi.mock('../../../../shared/infra/services/profile/profileService', () => ({
  getProfileById: vi.fn(),
}));

vi.mock('../../../../shared/infra/services/projects/projectService', () => ({
  getProjectsByDevProfileId: vi.fn(),
}));

const mockedGetProfileById = vi.mocked(getProfileById);
const mockedGetProjectsByDevProfileId = vi.mocked(getProjectsByDevProfileId);

describe('useProfile hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should not fetch data when id is undefined', () => {
    renderHook(() => useProfile());

    expect(mockedGetProfileById).not.toHaveBeenCalled();
    expect(mockedGetProjectsByDevProfileId).not.toHaveBeenCalled();
  });

  it('should fetch profile and projects successfully', async () => {
    const mockUser: User = {
      id: '1',
      name: 'Gustavo',
      email: 'gustavo@email.com',
    } as User;

    const mockProjects: ProjectResponse = {
      content: [],
      totalElements: 0,
      totalPages: 0,
      page: 0,
      size: 20,
    };

    mockedGetProfileById.mockResolvedValueOnce(mockUser);
    mockedGetProjectsByDevProfileId.mockResolvedValueOnce(mockProjects);

    const { result } = renderHook(() => useProfile('1'));

    expect(result.current.state.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.state.loading).toBe(false);
    });

    expect(result.current.state.profile).toEqual(mockUser);
    expect(result.current.state.projects).toEqual(mockProjects);
    expect(result.current.state.error).toBeNull();

    expect(mockedGetProfileById).toHaveBeenCalledWith('1');
    expect(mockedGetProjectsByDevProfileId).toHaveBeenCalledWith('1', 0, 20);
  });

  it('should handle error when one of the requests fails', async () => {
    const error = new Error('Network error');

    mockedGetProfileById.mockRejectedValueOnce(error);
    mockedGetProjectsByDevProfileId.mockResolvedValueOnce(
      {} as ProjectResponse,
    );

    const { result } = renderHook(() => useProfile('1'));

    await waitFor(() => {
      expect(result.current.state.loading).toBe(false);
    });

    expect(result.current.state.profile).toBeUndefined();
    expect(result.current.state.projects).toBeUndefined();
    expect(result.current.state.error).toBe(error);
  });

  it('should refetch data when page changes', async () => {
    mockedGetProfileById.mockResolvedValue({} as User);
    mockedGetProjectsByDevProfileId.mockResolvedValue({} as ProjectResponse);

    const { result } = renderHook(() => useProfile('1'));

    await waitFor(() => {
      expect(result.current.state.loading).toBe(false);
    });

    act(() => {
      result.current.actions.handlePageChange(1);
    });

    await waitFor(() => {
      expect(mockedGetProjectsByDevProfileId).toHaveBeenLastCalledWith(
        '1',
        1,
        20,
      );
    });
  });

  it('should reset page when size changes', async () => {
    mockedGetProfileById.mockResolvedValue({} as User);
    mockedGetProjectsByDevProfileId.mockResolvedValue({} as ProjectResponse);

    const { result } = renderHook(() => useProfile('1'));

    await waitFor(() => {
      expect(result.current.state.loading).toBe(false);
    });

    act(() => {
      result.current.actions.handlePageChange(2);
    });

    act(() => {
      result.current.actions.handleSizeChange(10);
    });

    expect(result.current.state.page).toBe(0);
    expect(result.current.state.size).toBe(10);
  });

  it('should not update state after unmount', async () => {
    let resolvePromise!: (value: User) => void;

    const profilePromise = new Promise<User>((resolve) => {
      resolvePromise = resolve;
    });

    mockedGetProfileById.mockReturnValueOnce(profilePromise);
    mockedGetProjectsByDevProfileId.mockReturnValueOnce(new Promise(() => {}));

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
