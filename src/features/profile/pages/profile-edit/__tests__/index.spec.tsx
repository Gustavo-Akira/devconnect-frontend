import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, vi, beforeEach, expect, type Mock } from 'vitest';
import { useProfileEdit } from '../hooks/useProfileEdit';
import { EditProfilePage } from '..';

vi.mock('../hooks/useProfileEdit');

describe('EditProfilePage', () => {
  const mockHandleProfileUpdate = vi.fn();
  const mockHandleReset = vi.fn();
  const mockChangeProperty = vi.fn();

  beforeEach(() => {
    vi.resetAllMocks();
    (useProfileEdit as Mock).mockReturnValue({
      actions: {
        changeProperty: mockChangeProperty,
        handleProfileUpdate: mockHandleProfileUpdate,
        handleReset: mockHandleReset,
      },
      state: {
        profileData: {
          name: 'John Doe',
          email: 'john@example.com',
          githubLink: 'https://github.com/johndoe',
          linkedinLink: 'https://linkedin.com/in/johndoe',
          stack: ['React', 'Node.js'],
          bio: 'Software Developer',
          address: {
            zipCode: '12345-678',
            street: 'Rua das Flores',
            city: 'São Paulo',
            state: 'SP',
            country: 'Brasil',
          },
        },
        error: '',
      },
    });
  });

  it('should render all fields with initial values', () => {
    render(<EditProfilePage />);

    expect(screen.getByLabelText(/Nome/i)).toHaveValue('John Doe');
    expect(screen.getByLabelText(/Email/i)).toHaveValue('john@example.com');
    expect(screen.getByLabelText(/Github/i)).toHaveValue(
      'https://github.com/johndoe',
    );
    expect(screen.getByLabelText(/Linkedin/i)).toHaveValue(
      'https://linkedin.com/in/johndoe',
    );
    expect(screen.getByLabelText(/Stack/i)).toHaveValue('React, Node.js');
    expect(screen.getByLabelText(/Bio/i)).toHaveValue('Software Developer');

    expect(screen.getByLabelText(/CEP/i)).toHaveValue('12345-678');
    expect(screen.getByLabelText(/Endereço/i)).toHaveValue('Rua das Flores');
    expect(screen.getByLabelText(/Cidade/i)).toHaveValue('São Paulo');
    expect(screen.getByLabelText(/Estado/i)).toHaveValue('SP');
    expect(screen.getByLabelText(/País/i)).toHaveValue('Brasil');
  });

  it('should call changeProperty when typing in a field', () => {
    render(<EditProfilePage />);

    fireEvent.change(screen.getByLabelText(/Nome/i), {
      target: { value: 'Jane Doe' },
    });

    expect(mockChangeProperty).toHaveBeenCalledWith('name', 'Jane Doe');
  });

  it('should call handleProfileUpdate when clicking Atualizar', () => {
    render(<EditProfilePage />);

    fireEvent.click(screen.getByRole('button', { name: /Atualizar/i }));

    expect(mockHandleProfileUpdate).toHaveBeenCalled();
  });

  it('should call handleReset when clicking Resetar', () => {
    render(<EditProfilePage />);

    fireEvent.click(screen.getByRole('button', { name: /Resetar/i }));

    expect(mockHandleReset).toHaveBeenCalled();
  });
});
