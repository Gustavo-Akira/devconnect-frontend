import { renderHook, act, waitFor } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { useAuth } from '../../../../../../shared/context/auth/authContext';
import {
  blockUser,
  getAllRelationsByUser,
  getAllPendingRelationsByUser,
  acceptRelationRequest,
} from '../../../../../../shared/infra/services/relation/relationService';
import { useRelationPage } from '../useRelationPage';
import type { RelationsResponse } from '../../../../../../shared/infra/services/relation/interface';
import type { User } from '../../../../../../shared/types/user';

vi.mock('../../../../../../shared/context/auth/authContext');
vi.mock('../../../../../../shared/infra/services/relation/relationService');

describe('useRelationPage', () => {
  const mockUser: User = {
    id: '1',
    name: 'testuser',
    email: 'akira',
    bio: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
    },
    githubLink: '',
    linkedinLink: '',
    stack: [],
    isActive: false,
  };

  const mockRelations: RelationsResponse = {
    Data: [
      {
        FromId: 1,
        ToID: 2,
        FromProfileName: 'user1',
        ToProfileName: 'user2',
        Type: 'FRIEND',
        Status: 'ACCEPTED',
      },
    ],
    Page: 1,
    TotalItems: 1,
    TotalPages: 1,
    HasNext: false,
    HasPrevious: false,
  };

  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(useAuth).mockReturnValue({
      isAuthenticated: true,
      user: mockUser,
      loading: false,
      login: vi.fn(),
      logout: vi.fn(),
    });

    vi.mocked(getAllRelationsByUser).mockResolvedValue(mockRelations);
    vi.mocked(blockUser).mockResolvedValue({
      FromId: 1,
      ToID: 2,
      FromProfileName: 'user1',
      ToProfileName: 'user2',
      Type: 'FRIEND',
      Status: 'ACCEPTED',
    });

    vi.mocked(getAllPendingRelationsByUser).mockResolvedValue([]);
    vi.mocked(acceptRelationRequest).mockResolvedValue({
      FromId: 0,
      ToID: 0,
      FromProfileName: '',
      ToProfileName: '',
      Type: 'FRIEND',
      Status: '',
    });
  });

  it('should fetch relations on mount', async () => {
    const { result } = renderHook(() => useRelationPage());

    // loading deve iniciar como true após efeito
    expect(result.current.state.loading).toBe(true);

    await waitFor(() => {
      expect(result.current.state.loading).toBe(false);
    });

    expect(getAllRelationsByUser).toHaveBeenCalledOnce();
    expect(getAllRelationsByUser).toHaveBeenCalledWith(1, 0);

    expect(result.current.state.relations).toEqual(mockRelations);
  });

  it('should call blockUser when blockAction is invoked', async () => {
    const { result } = renderHook(() => useRelationPage());

    await waitFor(() => {
      expect(result.current.state.loading).toBe(false);
    });

    await act(async () => {
      result.current.actions.blockAction(2);
    });

    expect(blockUser).toHaveBeenCalledOnce();
    expect(blockUser).toHaveBeenCalledWith(1, 2);
  });

  it('should expose profileAction without crashing', async () => {
    const { result } = renderHook(() => useRelationPage());

    await waitFor(() => {
      expect(result.current.state.loading).toBe(false);
    });

    expect(() => result.current.actions.profileAction(99)).not.toThrow();
  });

  it('should change page when handlePageChange is called', async () => {
    const { result } = renderHook(() => useRelationPage());
    await waitFor(() => {
      expect(result.current.state.loading).toBe(false);
    });

    act(() => {
      result.current.actions.handlePageChange(2);
    });
    expect(result.current.state.page).toBe(2);
  });

  it('should fetch pending requests on mount', async () => {
    const { result } = renderHook(() => useRelationPage());

    await waitFor(() => {
      expect(result.current.state.loading).toBe(false);
    });

    expect(getAllPendingRelationsByUser).toHaveBeenCalledWith(1);
    expect(result.current.state.pendingRequests).toEqual([]);
  });

  it('should call acceptRelationRequest when acceptFriendRequest is invoked', async () => {
    const { result } = renderHook(() => useRelationPage());

    await waitFor(() => {
      expect(result.current.state.loading).toBe(false);
    });

    await act(async () => {
      result.current.actions.acceptFriendRequest(2);
    });

    expect(acceptRelationRequest).toHaveBeenCalledWith(1, 2);
    expect(getAllPendingRelationsByUser).toHaveBeenCalledTimes(2);
    expect(result.current.state.page).toBe(0);
  });
});
