import { signup } from '../authService';
import { api } from '../../../api';
import { vi } from 'vitest';
vi.mock('../../../api', () => ({
    api: {
        post: vi.fn(),
    },
}));
describe('signup', () => {
    const mockRequest = {
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
        api.post.mockResolvedValueOnce({ data: { success: true } });
        const result = await signup(mockRequest);
        expect(api.post).toHaveBeenCalledWith('v1/dev-profiles', mockRequest);
        expect(result).toEqual({ success: true });
    });
    it('deve lançar erro quando a requisição falhar', async () => {
        const mockError = new Error('Request failed');
        api.post.mockRejectedValueOnce(mockError);
        await expect(signup(mockRequest)).rejects.toThrow('Request failed');
        expect(api.post).toHaveBeenCalledWith('v1/dev-profiles', mockRequest);
    });
});
