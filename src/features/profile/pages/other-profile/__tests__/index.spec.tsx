import { render, screen } from '@testing-library/react';
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
      },
      actions: {
        handlePageChange: vi.fn(),
        handleSizeChange: vi.fn(),
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
      },
      actions: {
        handlePageChange: vi.fn(),
        handleSizeChange: vi.fn(),
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
        },
        loading: false,
        projects: undefined,
        error: null,
        page: 0,
        size: 20,
      },
      actions: {
        handlePageChange: vi.fn(),
        handleSizeChange: vi.fn(),
      },
    });

    render(<OtherProfilePage />);

    expect(screen.getByText('Gustavo')).toBeInTheDocument();
    expect(screen.getByText('Fullstack Developer')).toBeInTheDocument();
    expect(screen.getByText('Solicitação Pendente')).toBeInTheDocument();
  });

  it('should render stack chips', () => {
    mockUseProfile.mockReturnValue({
      state: {
        profile: {
          name: 'Gustavo',
          bio: '',
          stack: ['React', 'Node', 'Java'],
          githubLink: '',
          linkedinLink: '',
        },
        relation: {
          Type: 'FRIEND',
          Status: 'ACCEPTED',
        },
        loading: false,
        projects: undefined,
        error: null,
        page: 0,
        size: 20,
      },
      actions: {
        handlePageChange: vi.fn(),
        handleSizeChange: vi.fn(),
      },
    });

    render(<OtherProfilePage />);

    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Node')).toBeInTheDocument();
    expect(screen.getByText('Java')).toBeInTheDocument();
  });

  it('should render social links', () => {
    mockUseProfile.mockReturnValue({
      state: {
        profile: {
          name: 'Gustavo',
          bio: '',
          stack: [],
          githubLink: 'https://github.com/test',
          linkedinLink: 'https://linkedin.com/in/test',
        },
        relation: {
          Type: 'FRIEND',
          Status: 'PENDING',
        },
        loading: false,
        projects: undefined,
        error: null,
        page: 0,
        size: 20,
      },
      actions: {
        handlePageChange: vi.fn(),
        handleSizeChange: vi.fn(),
      },
    });

    render(<OtherProfilePage />);

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute('href', 'https://github.com/test');
    expect(links[1]).toHaveAttribute('href', 'https://linkedin.com/in/test');
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
      },
      actions: {
        handlePageChange: vi.fn(),
        handleSizeChange: vi.fn(),
      },
    });

    render(<OtherProfilePage />);

    expect(screen.getByTestId('data-grid')).toBeInTheDocument();
    expect(screen.getByText('Project A')).toBeInTheDocument();
  });
});
