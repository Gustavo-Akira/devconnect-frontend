import { render, screen, fireEvent } from '@testing-library/react';
import { ProfileCard } from '../profileCard';
import '@testing-library/jest-dom';
import { vi } from 'vitest';

beforeAll(() => {
  window.ResizeObserver =
    window.ResizeObserver ||
    class {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
});

describe('ProfileCard Component', () => {
  const mockOnAddFriend = vi.fn();
  const mockOnBlock = vi.fn();

  const mockProps = {
    id: 1,
    name: 'Gustavo',
    city: 'São Paulo',
    score: 0.82,
    stacks: ['React', 'Node.js', 'Go'],
    onAddFriend: mockOnAddFriend,
    onBlock: mockOnBlock,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renderiza o nome', () => {
    render(<ProfileCard {...mockProps} />);
    expect(screen.getByText('Gustavo')).toBeInTheDocument();
  });

  it('renderiza a cidade', () => {
    render(<ProfileCard {...mockProps} />);
    expect(screen.getByText('São Paulo')).toBeInTheDocument();
  });

  it('mostra o score em porcentagem corretamente', () => {
    render(<ProfileCard {...mockProps} />);
    expect(screen.getByText('Match: 82%')).toBeInTheDocument();
  });

  it('renderiza os stacks', () => {
    render(<ProfileCard {...mockProps} />);

    mockProps.stacks.forEach((stack) => {
      expect(screen.getByText(stack)).toBeInTheDocument();
    });
  });

  it('tem a barra de progresso com o valor correto', () => {
    const { container } = render(<ProfileCard {...mockProps} />);

    const progress = container.querySelector('.MuiLinearProgress-bar');

    expect(progress).toHaveStyle(`transform: translateX(-18%)`);
  });

  it('renderiza corretamente mesmo sem stacks', () => {
    render(
      <ProfileCard
        id={2}
        name="João"
        city="Curitiba"
        score={0.5}
        stacks={[]}
      />,
    );

    expect(screen.getByText('João')).toBeInTheDocument();
  });

  it('chama onAddFriend com id correto ao clicar Adicionar', () => {
    render(<ProfileCard {...mockProps} />);

    const addButton = screen.getByRole('button', { name: /Adicionar/i });
    fireEvent.click(addButton);

    expect(mockOnAddFriend).toHaveBeenCalledWith(1);
  });

  it('chama onBlock com id correto ao clicar Bloquear', () => {
    render(<ProfileCard {...mockProps} />);

    const blockButton = screen.getByRole('button', { name: /Bloquear/i });
    fireEvent.click(blockButton);

    expect(mockOnBlock).toHaveBeenCalledWith(1);
  });
});
