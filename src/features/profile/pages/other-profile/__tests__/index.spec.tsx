import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { OtherProfilePage } from '../index';
import { useProfile } from '../../../hooks/useProfile';

vi.mock('../../../hooks/useProfile', () => ({
  useProfile: vi.fn(),
}));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: () => ({ id: '123' }),
  };
});

const mockUseProfile = useProfile as Mock;

describe('OtherProfilePage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render loading state', () => {
    mockUseProfile.mockReturnValue({
      profile: null,
      loading: true,
    });

    render(<OtherProfilePage />);

    expect(screen.getByText('Carregando...')).toBeInTheDocument();
  });

  it('should render "Perfil não encontrado" when profile is null', () => {
    mockUseProfile.mockReturnValue({
      profile: null,
      loading: false,
    });

    render(<OtherProfilePage />);

    expect(screen.getByText('Perfil não encontrado')).toBeInTheDocument();
  });

  it('should render profile name and bio', () => {
    mockUseProfile.mockReturnValue({
      loading: false,
      profile: {
        name: 'Gustavo',
        bio: 'Fullstack Developer',
        stack: [],
        githubLink: '',
        linkedinLink: '',
      },
    });

    render(<OtherProfilePage />);

    expect(screen.getByText('Gustavo')).toBeInTheDocument();
    expect(screen.getByText('Fullstack Developer')).toBeInTheDocument();
  });

  it('should render stack chips', () => {
    mockUseProfile.mockReturnValue({
      loading: false,
      profile: {
        name: 'Gustavo',
        bio: '',
        stack: ['React', 'Node', 'Java'],
        githubLink: '',
        linkedinLink: '',
      },
    });

    render(<OtherProfilePage />);

    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Node')).toBeInTheDocument();
    expect(screen.getByText('Java')).toBeInTheDocument();
  });

  it('should render social links', () => {
    mockUseProfile.mockReturnValue({
      loading: false,
      profile: {
        name: 'Gustavo',
        bio: '',
        stack: [],
        githubLink: 'https://github.com/test',
        linkedinLink: 'https://linkedin.com/in/test',
      },
    });

    render(<OtherProfilePage />);

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(2);

    expect(links[0]).toHaveAttribute('href', 'https://github.com/test');
    expect(links[1]).toHaveAttribute('href', 'https://linkedin.com/in/test');
  });
});
