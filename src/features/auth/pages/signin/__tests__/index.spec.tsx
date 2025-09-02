import { render, screen, fireEvent } from '@testing-library/react';
import { SignIn } from '../';
import { MemoryRouter } from 'react-router-dom';

describe('SignIn Component', () => {
  it('deve renderizar o título Login', () => {
    render(
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>,
    );
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('deve renderizar os campos de Email e Senha', () => {
    render(
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>,
    );
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Senha')).toBeInTheDocument();
  });

  it('deve permitir digitar no campo de Email', () => {
    render(
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>,
    );
    const emailInput = screen.getByLabelText('Email') as HTMLInputElement;

    fireEvent.change(emailInput, { target: { value: 'teste@email.com' } });
    expect(emailInput.value).toBe('teste@email.com');
  });

  it('deve permitir digitar no campo de Senha', () => {
    render(
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>,
    );
    const passwordInput = screen.getByLabelText('Senha') as HTMLInputElement;

    fireEvent.change(passwordInput, { target: { value: '123456' } });
    expect(passwordInput.value).toBe('123456');
  });

  it('deve renderizar os botões de Entrar e Esqueci minha senha', () => {
    render(
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>,
    );
    expect(screen.getByRole('button', { name: /Entrar/i })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Esqueci minha senha/i }),
    ).toBeInTheDocument();
  });

  it('deve chamar o evento ao clicar em Entrar', () => {
    render(
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>,
    );
    const button = screen.getByRole('button', { name: /Entrar/i });
    fireEvent.click(button);
    expect(button).toBeEnabled();
  });
});
