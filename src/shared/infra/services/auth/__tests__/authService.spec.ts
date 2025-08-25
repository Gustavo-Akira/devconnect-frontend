import { signin, signup } from '../authService';
import { api } from '../../../api';
import type { SignupRequest } from '../types';
import { vi, type Mock } from 'vitest';

vi.mock('../../../api', () => ({
  api: {
    post: vi.fn(),
  },
}));

describe('signup', () => {
  const mockRequest: SignupRequest = {
    name: 'Gustavo',
    email: 'gustavo@example.com',
    password: '123456',
    street: '123 Main St, 123',
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
    (api.post as Mock).mockResolvedValueOnce({ data: { success: true } });

    const result = await signup(mockRequest);

    expect(api.post).toHaveBeenCalledWith('v1/dev-profiles', mockRequest);
    expect(result).toEqual({ success: true });
  });

  it('deve lançar erro quando a requisição falhar', async () => {
    const mockError = new Error('Request failed');
    (api.post as Mock).mockRejectedValueOnce(mockError);

    await expect(signup(mockRequest)).rejects.toThrow('Request failed');
    expect(api.post).toHaveBeenCalledWith('v1/dev-profiles', mockRequest);
  });
});

describe('signin', () => {
  const mockEmail = 'email@email.com';

  const mockPassword = '123456';

  it('deve chamar o endpoint correto com os dados de email e password', async () => {
    (api.post as Mock).mockResolvedValueOnce({ data: { token: 'abc123' } });
    const result = await signin(mockEmail, mockPassword);
    expect(api.post).toHaveBeenCalledWith('v1/auth/signin', {
      email: mockEmail,
      password: mockPassword,
    });
    expect(result).toEqual({ token: 'abc123' });
  });

  it('deve lançar erro quando a requisição falhar', async () => {
    const mockError = new Error('Request failed');
    (api.post as Mock).mockRejectedValueOnce(mockError);

    await expect(signin(mockEmail, mockPassword)).rejects.toThrow(
      'Request failed',
    );
    expect(api.post).toHaveBeenCalledWith('v1/auth/signin', {
      email: mockEmail,
      password: mockPassword,
    });
  });
});
