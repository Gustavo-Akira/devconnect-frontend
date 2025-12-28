import { renderHook, waitFor, act } from '@testing-library/react';
import { vi, type Mock } from 'vitest';

import { useFriendsPage } from '../useFriendsPage';
import { useAuth } from '../../../../../../shared/context/auth/authContext';
import {
  blockUser,
  getRecommendationsByProfile,
  requestFriendShip,
} from '../../../../../../shared/infra/services/relation/relationService';

vi.mock(
  '../../../../../../shared/context/auth/authContext',
  async (importOriginal) => ({
    ...(await importOriginal()),
    useAuth: vi.fn(),
  }),
);

const mockShowNotification = vi.fn();
vi.mock(
  '../../../../../../shared/context/notification/notificationContext',
  () => {
    return {
      useNotification: () => ({
        showNotification: mockShowNotification,
      }),
    };
  },
);

vi.mock(
  '../../../../../../shared/infra/services/relation/relationService',
  () => ({
    getRecommendationsByProfile: vi.fn(),
    requestFriendShip: vi.fn(),
    blockUser: vi.fn(),
  }),
);

describe('useFriendsPage', () => {
  const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
  const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

  beforeEach(() => {
    vi.clearAllMocks();

    (useAuth as Mock).mockReturnValue({
      user: {
        id: '13',
        name: 'Test User',
        email: 'akirauekita2002@gmail.com',
      },
    });
  });

  it('should fetch recommendations successfully and update state', async () => {
    (getRecommendationsByProfile as Mock).mockResolvedValueOnce([
      { ID: 12, Name: 'Akira', Score: 1.0 },
    ]);

    const { result } = renderHook(() => useFriendsPage());

    await waitFor(() => {
      expect(result.current.state.recommendations.length).toBe(1);
      expect(result.current.state.recommendations[0].Name).toBe('Akira');
    });

    expect(getRecommendationsByProfile).toHaveBeenCalledWith(13);
    expect(logSpy).toHaveBeenCalled();
  });

  it('should handle API errors and call console.error', async () => {
    (getRecommendationsByProfile as Mock).mockRejectedValueOnce(
      new Error('fail'),
    );

    const { result } = renderHook(() => useFriendsPage());

    await waitFor(() => {
      expect(errorSpy).toHaveBeenCalled();
    });

    expect(result.current.state.recommendations.length).toBe(0);
    expect(mockShowNotification).toHaveBeenCalledWith(
      'Erro ao pegar recomendações',
      'error',
    );
  });

  it('should refetch when user changes', async () => {
    (getRecommendationsByProfile as Mock).mockResolvedValueOnce([
      { ID: 99, Name: 'Shin', Score: 0.9 },
    ]);

    const initialUser = { user: { id: '13' } };
    (useAuth as Mock).mockReturnValue(initialUser);

    const { result, rerender } = renderHook(() => useFriendsPage());

    await waitFor(() => {
      expect(getRecommendationsByProfile).toHaveBeenCalledWith(13);
    });

    (useAuth as Mock).mockReturnValue({
      user: {
        id: '20',
        name: 'Novo User',
      },
    });

    (getRecommendationsByProfile as Mock).mockResolvedValueOnce([
      { ID: 20, Name: 'Novo', Score: 1.0, City: 'Mogi', Stacks: ['java'] },
    ]);

    rerender();

    await waitFor(() => {
      expect(getRecommendationsByProfile).toHaveBeenCalledWith(20);
      expect(result.current.state.recommendations[0].ID).toBe(20);
      expect(result.current.state.recommendations[0].City).toBe('Mogi');
      expect(result.current.state.recommendations[0].Stacks[0]).toBe('java');
    });
  });

  it('should send friend request and filter recommendations on success', async () => {
    (getRecommendationsByProfile as Mock).mockResolvedValueOnce([
      { ID: 12, Name: 'Akira', Score: 1.0 },
      { ID: 34, Name: 'Other', Score: 0.5 },
    ]);
    (requestFriendShip as Mock).mockResolvedValueOnce({});

    const { result } = renderHook(() => useFriendsPage());

    await waitFor(() => {
      expect(result.current.state.recommendations.length).toBe(2);
    });

    await act(async () => {
      await result.current.actions.addFriendShip(12);
    });

    await waitFor(() => {
      expect(requestFriendShip).toHaveBeenCalledWith(13, 12);
      expect(result.current.state.recommendations.length).toBe(1);
      expect(result.current.state.recommendations[0].ID).toBe(34);
      expect(result.current.state.loading).toBe(false);
    });
  });

  it('should set error when friend request fails', async () => {
    (getRecommendationsByProfile as Mock).mockResolvedValueOnce([
      { ID: 55, Name: 'Fail', Score: 0.2 },
    ]);
    (requestFriendShip as Mock).mockRejectedValueOnce(
      new Error('fail request'),
    );

    const { result } = renderHook(() => useFriendsPage());

    await waitFor(() => {
      expect(result.current.state.recommendations.length).toBe(1);
    });

    await act(async () => {
      await result.current.actions.addFriendShip(55);
    });

    await waitFor(() => {
      expect(requestFriendShip).toHaveBeenCalledWith(13, 55);
      expect(errorSpy).toHaveBeenCalled();
      expect(result.current.state.recommendations.length).toBe(1);
      expect(mockShowNotification).toHaveBeenCalledWith(
        'Erro ao enviar solicitação de amizade',
        'error',
      );
    });
  });

  it('should send block user request and filter recommendations on success', async () => {
    (getRecommendationsByProfile as Mock).mockResolvedValueOnce([
      { ID: 12, Name: 'Akira', Score: 1.0 },
      { ID: 34, Name: 'Other', Score: 0.5 },
    ]);
    (blockUser as Mock).mockResolvedValueOnce({});

    const { result } = renderHook(() => useFriendsPage());

    await waitFor(() => {
      expect(result.current.state.recommendations.length).toBe(2);
    });

    await act(async () => {
      await result.current.actions.blockUserAction(12);
    });

    await waitFor(() => {
      expect(blockUser).toHaveBeenCalledWith(13, 12);
      expect(result.current.state.recommendations.length).toBe(1);
      expect(result.current.state.recommendations[0].ID).toBe(34);
      expect(result.current.state.loading).toBe(false);
    });
  });

  it('should set error when friend request fails', async () => {
    (getRecommendationsByProfile as Mock).mockResolvedValueOnce([
      { ID: 55, Name: 'Fail', Score: 0.2 },
    ]);
    (blockUser as Mock).mockRejectedValueOnce(new Error('fail request'));

    const { result } = renderHook(() => useFriendsPage());

    await waitFor(() => {
      expect(result.current.state.recommendations.length).toBe(1);
    });

    await act(async () => {
      await result.current.actions.blockUserAction(55);
    });

    await waitFor(() => {
      expect(blockUser).toHaveBeenCalledWith(13, 55);
      expect(errorSpy).toHaveBeenCalled();
      expect(result.current.state.recommendations.length).toBe(1);
      expect(mockShowNotification).toHaveBeenCalledWith(
        'Erro ao bloquear usuário',
        'error',
      );
    });
  });
});
