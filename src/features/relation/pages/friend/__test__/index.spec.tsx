import { vi, type Mock } from 'vitest';
import { useAuth } from '../../../../../shared/context/auth/authContext';
import { render, screen, waitFor } from '@testing-library/react';
import { FriendsPage } from '..';
import { getRecommendationsByProfile } from '../../../../../shared/infra/services/relation/relationService';

vi.mock(
  '../../../../../shared/context/auth/authContext',
  async (importOriginal) => ({
    ...(await importOriginal()),
    useAuth: vi.fn(),
  }),
);

vi.mock('react-router-dom', async (importOriginal) => ({
  ...(await importOriginal()),
  useNavigate: () => vi.fn(),
}));

vi.mock(
  '../../../../../shared/infra/services/relation/relationService',
  () => ({
    getRecommendationsByProfile: vi.fn(),
  }),
);

vi.mock(
  '../../../../../shared/context/notification/notificationContext',
  () => {
    return {
      useNotification: () => ({
        showNotification: vi.fn(),
      }),
    };
  },
);

describe('Friends Page Ui tests', () => {
  beforeAll(() => {
    (useAuth as Mock).mockReturnValue({
      user: {
        id: '13',
        name: 'Test User',
        email: 'akirauekita2002@gmail.com',
      },
    });

    (getRecommendationsByProfile as Mock).mockResolvedValueOnce([
      {
        ID: 12,
        Name: 'Akira',
        Score: 1.0,
        CityName: 'Mogi',
        Stacks: ['java'],
      },
    ]);
  });
  it('should render Friends Page correctly when user is authenticated', () => {
    render(<FriendsPage />);
    waitFor(() => {
      expect(screen.getByText('Akira')).toBeInTheDocument();
      expect(screen.getByText('java')).toBeInTheDocument();
      expect(screen.getByText('Mogi')).toBeInTheDocument();
    });
  });
});
