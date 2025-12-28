import { renderHook, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useOtherProfilePage } from '../useProfile';
import type { User } from '../../../../../../shared/types/user';
import type { ProjectResponse } from '../../../../../../shared/infra/services/projects/interface';
import type { Relation } from '../../../../../../shared/infra/services/relation/interface';

import { getProfileById } from '../../../../../../shared/infra/services/profile/profileService';
import { getProjectsByDevProfileId } from '../../../../../../shared/infra/services/projects/projectService';
import {
  acceptRelationRequest,
  blockUser,
  getRelationByFromIdAndToId,
  requestFriendShip,
} from '../../../../../../shared/infra/services/relation/relationService';
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
    requestFriendShip: vi.fn(),
    acceptRelationRequest: vi.fn(),
    blockUser: vi.fn(),
  }),
);

vi.mock('../../../../../../shared/context/auth/authContext', () => ({
  useAuth: vi.fn(),
}));

const mockShowNotification = vi.fn();

vi.mock(
  '../../../../../../shared/context/notification/notificationContext',
  () => ({
    useNotification: () => ({
      showNotification: mockShowNotification,
    }),
  }),
);

const mockedGetProfileById = vi.mocked(getProfileById);
const mockedGetProjectsByDevProfileId = vi.mocked(getProjectsByDevProfileId);
const mockedGetRelationByFromIdAndToId = vi.mocked(getRelationByFromIdAndToId);
const mockedUseAuth = vi.mocked(useAuth);
const mockedRequestFriendShip = vi.mocked(requestFriendShip);
const mockedAcceptRelationRequest = vi.mocked(acceptRelationRequest);
const mockedBlockUser = vi.mocked(blockUser);

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
      ToID: 1,
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
  describe('Relation Actions', () => {
    it('should request friendship when relation is undefined', async () => {
      mockedGetProfileById.mockResolvedValue({} as User);
      mockedGetProjectsByDevProfileId.mockResolvedValue({} as ProjectResponse);
      mockedGetRelationByFromIdAndToId.mockResolvedValue(
        undefined as unknown as Relation,
      );

      const newRelation = {
        FromId: 10,
        ToID: 1,
        Status: 'PENDING',
        Type: 'FRIEND',
      } as Relation;

      mockedRequestFriendShip.mockResolvedValueOnce(newRelation);

      const { result } = renderHook(() => useOtherProfilePage('1'));

      await waitFor(() => {
        expect(result.current.state.loading).toBe(false);
      });

      await act(async () => {
        result.current.actions.handleButtonClick();
      });
      expect(mockShowNotification).toHaveBeenCalled();

      expect(mockedRequestFriendShip).toHaveBeenCalledWith(10, 1);
      expect(result.current.state.relation).toEqual(newRelation);
    });
    it('should accept relation request when status is PENDING and user is target', async () => {
      const pendingRelation: Relation = {
        FromId: 1,
        ToID: 10,
        Status: 'PENDING',
        Type: 'FRIEND',
      } as Relation;

      mockedGetProfileById.mockResolvedValue({} as User);
      mockedGetProjectsByDevProfileId.mockResolvedValue({} as ProjectResponse);
      mockedGetRelationByFromIdAndToId.mockResolvedValue(pendingRelation);

      mockedAcceptRelationRequest.mockResolvedValueOnce({} as Relation);

      const { result } = renderHook(() => useOtherProfilePage('1'));

      await waitFor(() => {
        expect(result.current.state.relation).toEqual(pendingRelation);
      });

      await act(async () => {
        result.current.actions.handleButtonClick();
      });
      expect(mockShowNotification).toHaveBeenCalled();
      expect(mockedAcceptRelationRequest).toHaveBeenCalledWith(10, 1);
      expect(result.current.state.relation?.Status).toBe('ACCEPTED');
    });

    it('should block user when relation is ACCEPTED', async () => {
      const acceptedRelation: Relation = {
        FromId: 10,
        ToID: 1,
        Status: 'ACCEPTED',
        Type: 'FRIEND',
      } as Relation;

      const blockedRelation: Relation = {
        ...acceptedRelation,
        Type: 'BLOCK',
      };

      mockedGetProfileById.mockResolvedValue({} as User);
      mockedGetProjectsByDevProfileId.mockResolvedValue({} as ProjectResponse);
      mockedGetRelationByFromIdAndToId.mockResolvedValue(acceptedRelation);
      mockedBlockUser.mockResolvedValueOnce(blockedRelation);

      const { result } = renderHook(() => useOtherProfilePage('1'));

      await waitFor(() => {
        expect(result.current.state.relation).toEqual(acceptedRelation);
      });

      await act(async () => {
        result.current.actions.handleButtonClick();
      });
      expect(mockShowNotification).toHaveBeenCalled();
      expect(mockedBlockUser).toHaveBeenCalledWith(10, 1);
      expect(result.current.state.relation).toEqual(blockedRelation);
    });
    it('should do nothing when relation type is BLOCK', async () => {
      const blockedRelation: Relation = {
        FromId: 10,
        ToID: 1,
        Status: 'ACCEPTED',
        Type: 'BLOCK',
      } as Relation;

      mockedGetProfileById.mockResolvedValue({} as User);
      mockedGetProjectsByDevProfileId.mockResolvedValue({} as ProjectResponse);
      mockedGetRelationByFromIdAndToId.mockResolvedValue(blockedRelation);

      const { result } = renderHook(() => useOtherProfilePage('1'));

      await waitFor(() => {
        expect(result.current.state.relation).toEqual(blockedRelation);
      });

      act(() => {
        result.current.actions.handleButtonClick();
      });

      expect(mockedBlockUser).not.toHaveBeenCalled();
      expect(mockedAcceptRelationRequest).not.toHaveBeenCalled();
      expect(mockedRequestFriendShip).not.toHaveBeenCalled();
    });
  });
});
