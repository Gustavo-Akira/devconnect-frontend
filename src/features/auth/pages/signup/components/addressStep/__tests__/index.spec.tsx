import { render, screen, fireEvent } from '@testing-library/react';
import { AddressStep } from '../';
import { vi } from 'vitest';

describe('AddressStep', () => {
  const mockOnChange = vi.fn();
  const defaultData = {
    address: 'Rua das Acácias',
    city: 'São Paulo',
    number: '123',
    neighborhood: 'Centro',
    state: 'SP',
    zipCode: '01234-567',
    country: 'Brasil',
    name: 'Gustavo',
    email: 'gustavo@example.com',
    password: '123456',
    githubLink: '',
    linkedinLink: '',
    bio: '',
    stack: [],
    confirmPassword: '14333241',
  };

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('deve renderizar todos os campos com labels corretos', () => {
    render(<AddressStep onChange={mockOnChange} data={defaultData} />);

    expect(screen.getByLabelText(/Rua/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Cidade/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Número/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Estado/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/CEP/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/País/i)).toBeInTheDocument();
  });

  it('deve exibir os valores iniciais corretamente', () => {
    render(<AddressStep onChange={mockOnChange} data={defaultData} />);

    expect(screen.getByLabelText(/Rua/i)).toHaveValue('Rua das Acácias');
    expect(screen.getByLabelText(/Cidade/i)).toHaveValue('São Paulo');
    expect(screen.getByLabelText(/Número/i)).toHaveValue('123');
    expect(screen.getByLabelText(/Estado/i)).toHaveValue('SP');
    expect(screen.getByLabelText(/CEP/i)).toHaveValue('01234-567');
    expect(screen.getByLabelText(/País/i)).toHaveValue('Brasil');
  });

  it('deve chamar onChange ao digitar nos campos', () => {
    render(<AddressStep onChange={mockOnChange} data={defaultData} />);

    fireEvent.change(screen.getByLabelText(/Rua/i), {
      target: { value: 'Rua Nova' },
    });
    expect(mockOnChange).toHaveBeenCalledWith('address', 'Rua Nova');

    fireEvent.change(screen.getByLabelText(/Cidade/i), {
      target: { value: 'Rio de Janeiro' },
    });
    expect(mockOnChange).toHaveBeenCalledWith('city', 'Rio de Janeiro');

    fireEvent.change(screen.getByLabelText(/Número/i), {
      target: { value: '456' },
    });
    expect(mockOnChange).toHaveBeenCalledWith('number', '456');

    fireEvent.change(screen.getByLabelText(/Estado/i), {
      target: { value: 'RJ' },
    });
    expect(mockOnChange).toHaveBeenCalledWith('state', 'RJ');

    fireEvent.change(screen.getByLabelText(/CEP/i), {
      target: { value: '22222-000' },
    });
    expect(mockOnChange).toHaveBeenCalledWith('zipCode', '22222-000');

    fireEvent.change(screen.getByLabelText(/País/i), {
      target: { value: 'Argentina' },
    });
    expect(mockOnChange).toHaveBeenCalledWith('country', 'Argentina');
  });
});
