import { vi, type Mock } from 'vitest';
import { useAuth } from '../../../../../shared/context/auth/authContext';
import { render, screen } from '@testing-library/react';
import { InfoPage } from '..';

vi.mock(
  '../../../../../shared/context/auth/authContext',
  async (importOriginal) => ({
    ...(await importOriginal()),
    useAuth: vi.fn(),
  }),
);

vi.mock('react-router-dom', async (importOriginal) => ({
  ...(await importOriginal()),
  useNavigate: () => vi.fn(),
}));
describe('Info Page Ui tests', () => {
  const user = {
    id: '',
    name: 'Gustavo',
    email: 'akirauekita@gmail.com',
    bio: 'Bio test',
    address: {
      street: 'address',
      city: 'city',
      state: 'state',
      zipCode: '08900-000',
      country: 'BR',
    },
    githubLink: 'githubLink',
    linkedinLink: 'linkedinLink',
    stack: ['java', 'react'],
    isActive: true,
  };
  beforeAll(() => {
    (useAuth as Mock).mockReturnValue({
      user: user,
    });
  });
  it('should print the title and the user info when user is present', () => {
    render(<InfoPage />);
    expect(screen.getByText('Informações Pessoais')).toBeInTheDocument();
    expect(screen.getByText('Gustavo')).toBeInTheDocument();
    expect(screen.getByText('akirauekita@gmail.com')).toBeInTheDocument();
    expect(screen.getByText('Bio test')).toBeInTheDocument();
    expect(screen.getByText('githubLink')).toBeInTheDocument();
    expect(screen.getByText('linkedinLink')).toBeInTheDocument();
    expect(screen.getByText('java')).toBeInTheDocument();
    expect(screen.getByText('react')).toBeInTheDocument();
  });
});
