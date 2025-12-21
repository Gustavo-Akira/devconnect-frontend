import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { SignIn } from '../';
import { useAuth } from '../../../../../shared/context/auth/authContext';
import { MemoryRouter } from 'react-router-dom';
import { vi, type Mock } from 'vitest';

vi.mock('../../../../../shared/context/auth/authContext', () => ({
  useAuth: vi.fn(),
}));

vi.mock(
  '../../../../../shared/context/notification/notificationContext',
  () => ({
    useNotification: vi.fn(() => ({
      showNotification: vi.fn(),
    })),
  }),
);

describe('SignIn Component', () => {
  const loginMock = vi.fn();

  beforeEach(() => {
    (useAuth as Mock).mockReturnValue({
      user: null,
      loading: false,
      isAuthenticated: false,
      login: loginMock,
      logout: vi.fn(),
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  const renderComponent = () =>
    render(
      <MemoryRouter>
        <SignIn />
      </MemoryRouter>,
    );

  it('deve renderizar o título Login', () => {
    renderComponent();
    expect(screen.getByText('Login')).toBeInTheDocument();
  });

  it('deve renderizar os campos de Email e Senha', () => {
    renderComponent();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
    expect(screen.getByLabelText('Senha')).toBeInTheDocument();
  });

  it('deve permitir digitar no campo de Email', () => {
    renderComponent();
    const emailInput = screen.getByLabelText('Email') as HTMLInputElement;

    fireEvent.change(emailInput, { target: { value: 'teste@email.com' } });
    expect(emailInput.value).toBe('teste@email.com');
  });

  it('deve permitir digitar no campo de Senha', () => {
    renderComponent();
    const passwordInput = screen.getByLabelText('Senha') as HTMLInputElement;

    fireEvent.change(passwordInput, { target: { value: '123456' } });
    expect(passwordInput.value).toBe('123456');
  });

  it('deve renderizar os botões de Entrar e Esqueci minha senha', () => {
    renderComponent();

    expect(screen.getByRole('button', { name: /Entrar/i })).toBeInTheDocument();

    expect(
      screen.getByRole('button', { name: /Esqueci minha senha/i }),
    ).toBeInTheDocument();
  });

  it('deve chamar login ao clicar em Entrar', () => {
    renderComponent();

    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'teste@email.com' },
    });

    fireEvent.change(screen.getByLabelText('Senha'), {
      target: { value: '123456' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Entrar/i }));
    waitFor(() => {
      expect(loginMock).toHaveBeenCalledTimes(1);
    });
  });
});
