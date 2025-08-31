import { render, screen } from '@testing-library/react';
import { ProfileLayout } from '../layout';
import { vi } from 'vitest';

vi.mock('../../side-menu/sideMenu', () => ({
  SideMenu: () => <div data-testid="side-menu">Mocked SideMenu</div>,
}));

describe('ProfileLayout', () => {
  it('deve renderizar o SideMenu', () => {
    render(
      <ProfileLayout>
        <div>Conteúdo</div>
      </ProfileLayout>,
    );

    expect(screen.getByTestId('side-menu')).toBeInTheDocument();
  });

  it('deve renderizar os children corretamente', () => {
    render(
      <ProfileLayout>
        <p>Texto do perfil</p>
      </ProfileLayout>,
    );

    expect(screen.getByText('Texto do perfil')).toBeInTheDocument();
  });

  it('aplica o estilo de layout corretamente', () => {
    const { container } = render(
      <ProfileLayout>
        <span>Child</span>
      </ProfileLayout>,
    );

    const layoutDiv = container.firstChild as HTMLElement;

    expect(layoutDiv).toHaveStyle('display: flex');
  });
});
