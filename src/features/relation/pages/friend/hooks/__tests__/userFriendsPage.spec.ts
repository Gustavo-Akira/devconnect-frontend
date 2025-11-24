import { renderHook, waitFor } from '@testing-library/react';
import { vi, type Mock } from 'vitest';

import { useFriendsPage } from '../useFriendsPage';
import { useAuth } from '../../../../../../shared/context/auth/authContext';
import { getRecommendationsByProfile } from '../../../../../../shared/infra/services/relation/recommendationService';

vi.mock(
  '../../../../../../shared/context/auth/authContext',
  async (importOriginal) => ({
    ...(await importOriginal()),
    useAuth: vi.fn(),
  }),
);

vi.mock(
  '../../../../../../shared/infra/services/relation/recommendationService',
  () => ({
    getRecommendationsByProfile: vi.fn(),
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

    // Muda o usuário para disparar o useEffect novamente
    (useAuth as Mock).mockReturnValue({
      user: {
        id: '20',
        name: 'Novo User',
      },
    });

    (getRecommendationsByProfile as Mock).mockResolvedValueOnce([
      { ID: 20, Name: 'Novo', Score: 1.0 },
    ]);

    rerender();

    await waitFor(() => {
      expect(getRecommendationsByProfile).toHaveBeenCalledWith(20);
      expect(result.current.state.recommendations[0].ID).toBe(20);
    });
  });
});
