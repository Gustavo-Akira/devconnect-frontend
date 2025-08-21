// signup.test.ts
import { signup } from '../authService';
import { api } from '../../../api';
import type { SignupRequest } from '../types';

// Faz o mock do api
jest.mock('../../../api', () => ({
  api: {
    post: jest.fn(),
  },
}));

describe('signup', () => {
  const mockRequest: SignupRequest = {
    name: 'Gustavo',
    email: 'gustavo@example.com',
    password: '123456',
    address: '123 Main St',
    number: '456',
    complement: 'Apt 789',
    neighborhood: 'Downtown',
    city: 'Metropolis',
    state: 'NY',
    zipCode: '12345',
    country: 'USA',
    githubLink: '',
    linkedinLink: '',
    bio: 'Developer',
    stack: ['JavaScript', 'React'],
  };

  it('deve chamar o endpoint correto com os dados de request', async () => {
    (api.post as jest.Mock).mockResolvedValueOnce({ data: { success: true } });

    const result = await signup(mockRequest);

    expect(api.post).toHaveBeenCalledWith('/api/auth/signup', mockRequest);
    expect(result).toEqual({ success: true });
  });

  it('deve lançar erro quando a requisição falhar', async () => {
    const mockError = new Error('Request failed');
    (api.post as jest.Mock).mockRejectedValueOnce(mockError);

    await expect(signup(mockRequest)).rejects.toThrow('Request failed');
    expect(api.post).toHaveBeenCalledWith('/api/auth/signup', mockRequest);
  });
});
