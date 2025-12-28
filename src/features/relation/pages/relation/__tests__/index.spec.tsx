import { render, screen, waitFor } from '@testing-library/react';
import { vi, type Mock } from 'vitest';
import { useAuth } from '../../../../../shared/context/auth/authContext';
import {
  getAllPendingRelationsByUser,
  getAllRelationsByUser,
} from '../../../../../shared/infra/services/relation/relationService';
import { RelationPage } from '..';
import { MemoryRouter } from 'react-router-dom';

vi.mock('../../../../../shared/context/auth/authContext');
vi.mock('../../../../../shared/infra/services/relation/relationService');
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

describe('RelationPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve chamar getAllRelationsByUser com o ID do usuário', async () => {
    (useAuth as Mock).mockReturnValue({ user: { id: '10' } });

    (getAllRelationsByUser as Mock).mockResolvedValue({
      relations: [],
    });

    (getAllPendingRelationsByUser as Mock).mockResolvedValue({
      relations: [],
    });

    render(
      <MemoryRouter>
        <RelationPage />
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(getAllRelationsByUser).toHaveBeenCalledWith(10, 0);
    });
  });

  it('deve renderizar os nomes das relações retornadas', async () => {
    (useAuth as Mock).mockReturnValue({ user: { id: '10' } });

    (getAllRelationsByUser as Mock).mockResolvedValue({
      Data: [
        { ToProfileName: 'Alice', ToID: 12 },
        { ToProfileName: 'Bruno', ToID: 14 },
      ],
    });

    (getAllPendingRelationsByUser as Mock).mockResolvedValue({
      relations: [
        {
          FromProfileName: 'Akira',
          FromID: 25,
          Type: 'FRIEND',
          Status: 'PENDING',
        },
      ],
    });

    render(
      <MemoryRouter>
        <RelationPage />
      </MemoryRouter>,
    );
    waitFor(() => {
      expect(screen.getByText('Alice')).toBeInTheDocument();
      expect(screen.getByText('Bruno')).toBeInTheDocument();
      expect(screen.getByText('Akira')).toBeInTheDocument();
    });
  });
});
