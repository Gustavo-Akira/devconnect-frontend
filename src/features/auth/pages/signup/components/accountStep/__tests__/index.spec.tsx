import { render, screen, fireEvent } from '@testing-library/react';
import { AccountStep } from '../';

describe('AccountStep', () => {
  const mockOnChange = jest.fn();
  const defaultData = {
    name: 'Gustavo',
    email: 'gustavo@example.com',
    password: '123456',
    address: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    githubLink: '',
    linkedinLink: '',
    bio: '',
    stack: [],
    confirmPassword: '14333241',
  };

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('deve renderizar os campos de texto com labels corretos', () => {
    render(<AccountStep onChange={mockOnChange} data={defaultData} />);

    expect(screen.getByLabelText(/Nome/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getAllByLabelText(/Senha/i)).toHaveLength(2);
  });

  it('deve exibir os valores iniciais corretamente', () => {
    render(<AccountStep onChange={mockOnChange} data={defaultData} />);

    expect(screen.getByLabelText(/Nome/i)).toHaveValue('Gustavo');
    expect(screen.getByLabelText(/Email/i)).toHaveValue('gustavo@example.com');
    expect(screen.getAllByLabelText(/Senha/i)[0]).toHaveValue('123456');
  });

  it('deve chamar onChange ao digitar nos campos', () => {
    render(<AccountStep onChange={mockOnChange} data={defaultData} />);

    const nomeInput = screen.getByLabelText(/Nome/i);
    fireEvent.change(nomeInput, { target: { value: 'Akira' } });

    expect(mockOnChange).toHaveBeenCalledWith('name', 'Akira');

    const emailInput = screen.getByLabelText(/Email/i);
    fireEvent.change(emailInput, { target: { value: 'akira@example.com' } });

    expect(mockOnChange).toHaveBeenCalledWith('email', 'akira@example.com');

    const senhaInput = screen.getAllByLabelText(/Senha/i)[0];
    fireEvent.change(senhaInput, { target: { value: 'novaSenha' } });

    expect(mockOnChange).toHaveBeenCalledWith('password', 'novaSenha');
  });
});
