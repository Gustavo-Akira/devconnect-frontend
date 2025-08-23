// DevInfoStep.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { DevInfoStep } from '../';
import { vi } from 'vitest';

describe('DevInfoStep', () => {
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
    githubLink: 'https://github.com/gustavo',
    linkedinLink: 'https://linkedin.com/in/gustavo',
    bio: 'Desenvolvedor fullstack',
    stack: ['React', 'Node.js', 'PostgreSQL'],
    confirmPassword: '123456',
  };

  beforeEach(() => {
    mockOnChange.mockClear();
  });

  it('deve renderizar todos os campos com labels corretos', () => {
    render(<DevInfoStep onChange={mockOnChange} data={defaultData} />);

    expect(screen.getByLabelText(/Link do Github/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Link do Linkedin/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Bio/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Stack/i)).toBeInTheDocument();
  });

  it('deve exibir os valores iniciais corretamente', () => {
    render(<DevInfoStep onChange={mockOnChange} data={defaultData} />);

    expect(screen.getByLabelText(/Link do Github/i)).toHaveValue(
      'https://github.com/gustavo',
    );
    expect(screen.getByLabelText(/Link do Linkedin/i)).toHaveValue(
      'https://linkedin.com/in/gustavo',
    );
    expect(screen.getByLabelText(/Bio/i)).toHaveValue(
      'Desenvolvedor fullstack',
    );
    // stack vira string unida por ", "
    expect(screen.getByLabelText(/Stack/i)).toHaveValue(
      'React, Node.js, PostgreSQL',
    );
  });

  it('deve chamar onChange ao digitar nos campos', () => {
    render(<DevInfoStep onChange={mockOnChange} data={defaultData} />);

    fireEvent.change(screen.getByLabelText(/Link do Github/i), {
      target: { value: 'https://github.com/akira' },
    });
    expect(mockOnChange).toHaveBeenCalledWith(
      'githubLink',
      'https://github.com/akira',
    );

    fireEvent.change(screen.getByLabelText(/Link do Linkedin/i), {
      target: { value: 'https://linkedin.com/in/akira' },
    });
    expect(mockOnChange).toHaveBeenCalledWith(
      'linkedinLink',
      'https://linkedin.com/in/akira',
    );

    fireEvent.change(screen.getByLabelText(/Bio/i), {
      target: { value: 'Novo bio' },
    });
    expect(mockOnChange).toHaveBeenCalledWith('bio', 'Novo bio');

    fireEvent.change(screen.getByLabelText(/Stack/i), {
      target: { value: 'Angular, Java, MongoDB' },
    });
    expect(mockOnChange).toHaveBeenCalledWith('stack', [
      'Angular',
      'Java',
      'MongoDB',
    ]);
  });
});
