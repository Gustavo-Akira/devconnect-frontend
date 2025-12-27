import { renderHook, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useOtherProfilePage } from '../useProfile';
import type { User } from '../../../../../../shared/types/user';
import type { ProjectResponse } from '../../../../../../shared/infra/services/projects/interface';
import type { Relation } from '../../../../../../shared/infra/services/relation/interface';

import { getProfileById } from '../../../../../../shared/infra/services/profile/profileService';
import { getProjectsByDevProfileId } from '../../../../../../shared/infra/services/projects/projectService';
import { getRelationByFromIdAndToId } from '../../../../../../shared/infra/services/relation/relationService';
import { useAuth } from '../../../../../../shared/context/auth/authContext';

vi.mock(
  '../../../../../../shared/infra/services/profile/profileService',
  () => ({
    getProfileById: vi.fn(),
  }),
);

vi.mock(
  '../../../../../../shared/infra/services/projects/projectService',
  () => ({
    getProjectsByDevProfileId: vi.fn(),
  }),
);

vi.mock(
  '../../../../../../shared/infra/services/relation/relationService',
  () => ({
    getRelationByFromIdAndToId: vi.fn(),
  }),
);

vi.mock('../../../../../../shared/context/auth/authContext', () => ({
  useAuth: vi.fn(),
}));

const mockedGetProfileById = vi.mocked(getProfileById);
const mockedGetProjectsByDevProfileId = vi.mocked(getProjectsByDevProfileId);
const mockedGetRelationByFromIdAndToId = vi.mocked(getRelationByFromIdAndToId);
const mockedUseAuth = vi.mocked(useAuth);

describe('useOtherProfilePage', () => {
  const authUser = { id: '10' } as User;

  beforeEach(() => {
    vi.clearAllMocks();
    mockedUseAuth.mockReturnValue({
      user: authUser,
      loading: false,
      isAuthenticated: false,
      login: function (): Promise<void> {
        throw new Error('Function not implemented.');
      },
      logout: function (): void {
        throw new Error('Function not implemented.');
      },
    });
  });

  it('should not fetch data when id is undefined', () => {
    renderHook(() => useOtherProfilePage());

    expect(mockedGetProfileById).not.toHaveBeenCalled();
    expect(mockedGetProjectsByDevProfileId).not.toHaveBeenCalled();
    expect(mockedGetRelationByFromIdAndToId).not.toHaveBeenCalled();
  });

  it('should fetch profile, projects and relation successfully', async () => {
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

    const mockRelation: Relation = {
      FromId: 10,
      TargetId: 1,
      Type: 'FRIEND',
      Status: 'ACCEPTED',
      FromProfileName: 'authUser',
      ToProfileName: 'Gustavo',
    } as Relation;

    mockedGetProfileById.mockResolvedValueOnce(mockUser);
    mockedGetProjectsByDevProfileId.mockResolvedValueOnce(mockProjects);
    mockedGetRelationByFromIdAndToId.mockResolvedValueOnce(mockRelation);

    const { result } = renderHook(() => useOtherProfilePage('1'));

    expect(result.current.state.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.state.loading).toBe(false);
    });

    expect(result.current.state.profile).toEqual(mockUser);
    expect(result.current.state.projects).toEqual(mockProjects);
    expect(result.current.state.relation).toEqual(mockRelation);
    expect(result.current.state.error).toBeNull();

    expect(mockedGetProfileById).toHaveBeenCalledWith('1');
    expect(mockedGetProjectsByDevProfileId).toHaveBeenCalledWith('1', 0, 20);
    expect(mockedGetRelationByFromIdAndToId).toHaveBeenCalledWith(10, 1);
  });

  it('should handle error when one request fails', async () => {
    const error = new Error('Network error');

    mockedGetProfileById.mockRejectedValueOnce(error);
    mockedGetProjectsByDevProfileId.mockResolvedValueOnce(
      {} as ProjectResponse,
    );
    mockedGetRelationByFromIdAndToId.mockResolvedValueOnce({} as Relation);

    const { result } = renderHook(() => useOtherProfilePage('1'));

    await waitFor(() => {
      expect(result.current.state.loading).toBe(false);
    });

    expect(result.current.state.profile).toBeUndefined();
    expect(result.current.state.projects).toBeUndefined();
    expect(result.current.state.error).toBe(error);
  });

  it('should refetch projects when page changes', async () => {
    mockedGetProfileById.mockResolvedValue({} as User);
    mockedGetProjectsByDevProfileId.mockResolvedValue({} as ProjectResponse);
    mockedGetRelationByFromIdAndToId.mockResolvedValue({} as Relation);

    const { result } = renderHook(() => useOtherProfilePage('1'));

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
    mockedGetRelationByFromIdAndToId.mockResolvedValue({} as Relation);

    const { result } = renderHook(() => useOtherProfilePage('1'));

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
    let resolveProfile!: (value: User) => void;

    const profilePromise = new Promise<User>((resolve) => {
      resolveProfile = resolve;
    });

    mockedGetProfileById.mockReturnValueOnce(profilePromise);
    mockedGetProjectsByDevProfileId.mockReturnValueOnce(new Promise(() => {}));
    mockedGetRelationByFromIdAndToId.mockReturnValueOnce(new Promise(() => {}));

    const { unmount } = renderHook(() => useOtherProfilePage('1'));

    unmount();

    resolveProfile({
      id: '1',
      name: 'Gustavo',
      email: 'gustavo@email.com',
    } as User);

    await Promise.resolve();
  });
});
