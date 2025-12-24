import { render, screen, fireEvent } from '@testing-library/react';
import { Signup } from '../';
import { vi } from 'vitest';

describe('Signup', () => {
  beforeAll(() => {
    vi.mock(
      '../../../../../shared/context/notification/notificationContext',
      () => ({
        useNotification: () => ({
          showNotification: vi.fn(),
        }),
      }),
    );
  });
  it('deve renderizar o stepper com todos os passos', () => {
    render(<Signup />);

    expect(screen.getByText(/Informações Pessoais/i)).toBeInTheDocument();
    expect(screen.getByText(/Dados de Acesso/i)).toBeInTheDocument();
    expect(screen.getByText(/Confirmação/i)).toBeInTheDocument();
  });

  it('deve renderizar o conteúdo do primeiro passo (AccountStep)', () => {
    render(<Signup />);
    expect(screen.getByLabelText(/Nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getAllByLabelText(/Senha/i)[0]).toBeInTheDocument();
  });

  it('deve avançar para o próximo passo ao clicar em Próximo', () => {
    render(<Signup />);

    fireEvent.click(screen.getByRole('button', { name: /Próximo/i }));

    expect(screen.getByLabelText(/Rua/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Cidade/i)).toBeInTheDocument();
  });

  it('deve voltar para o passo anterior ao clicar em Voltar', () => {
    render(<Signup />);

    // avança para step 1
    fireEvent.click(screen.getByRole('button', { name: /Próximo/i }));
    expect(screen.getByLabelText(/Rua/i)).toBeInTheDocument();

    // volta para step 0
    fireEvent.click(screen.getByRole('button', { name: /Voltar/i }));
    expect(screen.getByLabelText(/Nome/i)).toBeInTheDocument();
  });

  it('deve exibir o botão Finalizar no último passo', () => {
    render(<Signup />);

    fireEvent.click(screen.getByRole('button', { name: /Próximo/i }));
    fireEvent.click(screen.getByRole('button', { name: /Próximo/i }));
    expect(screen.getByLabelText(/Link do Github/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Finalizar/i }),
    ).toBeInTheDocument();
  });
});
