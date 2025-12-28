import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { OtherProfilePage } from '../index';
import { useOtherProfilePage } from '../hooks/useProfile';

vi.mock('../hooks/useProfile', () => ({
  useOtherProfilePage: vi.fn(),
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: () => ({ id: '123' }),
  };
});

vi.mock('@mui/x-data-grid', () => ({
  DataGrid: ({ rows }: { rows: [] }) => (
    <div data-testid="data-grid">
      {rows.map((row: { id: string; name: string }) => (
        <div key={row.id}>{row.name}</div>
      ))}
    </div>
  ),
}));

const mockUseProfile = useOtherProfilePage as Mock;

describe('OtherProfilePage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render loading state', () => {
    mockUseProfile.mockReturnValue({
      state: {
        profile: undefined,
        relation: undefined,
        loading: true,
        projects: undefined,
        error: null,
        page: 0,
        size: 20,
        loggedId: 10,
      },
      actions: {
        handlePageChange: vi.fn(),
        handleSizeChange: vi.fn(),
        handleButtonClick: vi.fn(),
      },
    });

    render(<OtherProfilePage />);

    expect(screen.getByText('Carregando...')).toBeInTheDocument();
  });

  it('should render "Perfil não encontrado" when profile is undefined', () => {
    mockUseProfile.mockReturnValue({
      state: {
        profile: undefined,
        relation: undefined,
        loading: false,
        projects: undefined,
        error: null,
        page: 0,
        size: 20,
        loggedId: 10,
      },
      actions: {
        handlePageChange: vi.fn(),
        handleSizeChange: vi.fn(),
        handleButtonClick: vi.fn(),
      },
    });

    render(<OtherProfilePage />);

    expect(screen.getByText('Perfil não encontrado')).toBeInTheDocument();
  });

  it('should render profile name and bio', () => {
    mockUseProfile.mockReturnValue({
      state: {
        profile: {
          name: 'Gustavo',
          bio: 'Fullstack Developer',
          stack: [],
          githubLink: '',
          linkedinLink: '',
        },
        relation: {
          Type: 'FRIEND',
          Status: 'PENDING',
          ToID: 123,
        },
        loading: false,
        projects: undefined,
        error: null,
        page: 0,
        size: 20,
        loggedId: 10,
      },
      actions: {
        handlePageChange: vi.fn(),
        handleSizeChange: vi.fn(),
        handleButtonClick: vi.fn(),
      },
    });

    render(<OtherProfilePage />);

    expect(screen.getByText('Gustavo')).toBeInTheDocument();
    expect(screen.getByText('Fullstack Developer')).toBeInTheDocument();
    expect(screen.getByText('Solicitação Pendente')).toBeInTheDocument();
  });

  it('should render "Aceitar Solicitação" when pending and user is target', () => {
    mockUseProfile.mockReturnValue({
      state: {
        profile: {
          name: 'Gustavo',
          bio: '',
          stack: [],
          githubLink: '',
          linkedinLink: '',
        },
        relation: {
          Type: 'FRIEND',
          Status: 'PENDING',
          ToID: 10,
        },
        loading: false,
        projects: undefined,
        error: null,
        page: 0,
        size: 20,
        loggedId: 10,
      },
      actions: {
        handlePageChange: vi.fn(),
        handleSizeChange: vi.fn(),
        handleButtonClick: vi.fn(),
      },
    });

    render(<OtherProfilePage />);

    expect(screen.getByText('Aceitar Solicitação')).toBeInTheDocument();
  });

  it('should disable button when relation is ACCEPTED', () => {
    mockUseProfile.mockReturnValue({
      state: {
        profile: {
          name: 'Gustavo',
          bio: '',
          stack: [],
          githubLink: '',
          linkedinLink: '',
        },
        relation: {
          Type: 'FRIEND',
          Status: 'ACCEPTED',
          ToID: 123,
        },
        loading: false,
        projects: undefined,
        error: null,
        page: 0,
        size: 20,
        loggedId: 10,
      },
      actions: {
        handlePageChange: vi.fn(),
        handleSizeChange: vi.fn(),
        handleButtonClick: vi.fn(),
      },
    });

    render(<OtherProfilePage />);

    const button = screen.getByTestId('relation-button');
    expect(button).toBeDisabled();
    expect(screen.getByText('Bloquear')).toBeInTheDocument();
  });

  it('should call handleButtonClick when clicking relation button', () => {
    const handleButtonClick = vi.fn();

    mockUseProfile.mockReturnValue({
      state: {
        profile: {
          name: 'Gustavo',
          bio: '',
          stack: [],
          githubLink: '',
          linkedinLink: '',
        },
        relation: undefined,
        loading: false,
        projects: undefined,
        error: null,
        page: 0,
        size: 20,
        loggedId: 10,
      },
      actions: {
        handlePageChange: vi.fn(),
        handleSizeChange: vi.fn(),
        handleButtonClick,
      },
    });

    render(<OtherProfilePage />);

    fireEvent.click(screen.getByText('Adicionar Amigo'));

    expect(handleButtonClick).toHaveBeenCalled();
  });

  it('should render projects in DataGrid', () => {
    mockUseProfile.mockReturnValue({
      state: {
        profile: {
          name: 'Gustavo',
          bio: '',
          stack: [],
          githubLink: '',
          linkedinLink: '',
        },
        relation: {
          Type: 'FRIEND',
          Status: 'PENDING',
          ToID: 123,
        },
        loading: false,
        projects: {
          content: [{ id: 1, name: 'Project A' }],
          totalElements: 1,
          size: 20,
        },
        error: null,
        page: 0,
        size: 20,
        loggedId: 10,
      },
      actions: {
        handlePageChange: vi.fn(),
        handleSizeChange: vi.fn(),
        handleButtonClick: vi.fn(),
      },
    });

    render(<OtherProfilePage />);

    expect(screen.getByTestId('data-grid')).toBeInTheDocument();
    expect(screen.getByText('Project A')).toBeInTheDocument();
  });
});
