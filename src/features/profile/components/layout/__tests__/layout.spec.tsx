import { render, screen } from '@testing-library/react';
import { ProfileLayout } from '../layout';
import { vi } from 'vitest';

vi.mock('../../side-menu/sideMenu', () => ({
  SideMenu: () => <div data-testid="side-menu">Mocked SideMenu</div>,
}));

describe('ProfileLayout', () => {
  it('deve renderizar o SideMenu', () => {
    render(<ProfileLayout />);

    expect(screen.getByTestId('side-menu')).toBeInTheDocument();
  });

  it('aplica o estilo de layout corretamente', () => {
    const { container } = render(<ProfileLayout />);

    const layoutDiv = container.firstChild as HTMLElement;

    expect(layoutDiv).toHaveStyle('display: flex');
  });
});
