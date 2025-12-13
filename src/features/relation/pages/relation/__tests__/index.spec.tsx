import { render, screen, waitFor } from '@testing-library/react';
import { vi, type Mock } from 'vitest';
import { useAuth } from '../../../../../shared/context/auth/authContext';
import { getAllRelationsByUser } from '../../../../../shared/infra/services/relation/relationService';
import { RelationPage } from '..';

vi.mock('../../../../../shared/context/auth/authContext');
vi.mock('../../../../../shared/infra/services/relation/relationService');

describe('RelationPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve chamar getAllRelationsByUser com o ID do usuário', async () => {
    (useAuth as Mock).mockReturnValue({ user: { id: '10' } });

    (getAllRelationsByUser as jest.Mock).mockResolvedValue({
      relations: [],
    });

    render(<RelationPage />);

    await waitFor(() => {
      expect(getAllRelationsByUser).toHaveBeenCalledWith(10);
    });
  });

  it('deve renderizar os nomes das relações retornadas', async () => {
    (useAuth as Mock).mockReturnValue({ user: { id: '10' } });

    (getAllRelationsByUser as jest.Mock).mockResolvedValue({
     Data: [{ ToProfileName: 'Alice', ToID:12 }, { ToProfileName: 'Bruno',ToID:14 }],
    });

    render(<RelationPage />);

    expect(await screen.findByText('Alice')).toBeInTheDocument();
    expect(await screen.findByText('Bruno')).toBeInTheDocument();
  });
});
