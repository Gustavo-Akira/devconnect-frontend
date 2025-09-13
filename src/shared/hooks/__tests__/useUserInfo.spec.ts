import { vi, type Mock } from 'vitest';
import { api } from '../../infra/api';
import { renderHook, waitFor } from '@testing-library/react';
import { useUserInfo } from '../useUserInfo';

vi.mock('../../infra/api', () => ({
  api: {
    get: vi.fn(),
  },
}));
describe('useUserInfo', () => {
  const mockGet = api.get as Mock;
  it('when request is successfull return user and isAuthenticated true', async () => {
    mockGet.mockResolvedValueOnce({
      data: {
        id: '',
        name: '',
        email: '',
        bio: '',
        address: {
          street: '',
          city: '',
          state: '',
          zipCode: '',
          country: '',
        },
        githubLink: '',
        linkedinLink: '',
        stack: [],
        isActive: true,
      },
    });
    const { result } = renderHook(() => useUserInfo());
    expect(result.current.loading).toBe(true);
    expect(result.current.user).toBe(null);
    await waitFor(() => {
      expect(result.current.user).not.toBe(null);
      expect(result.current.loading).toBe(false);
      expect(result.current.isAuthenticated).toBe(true);
    });
  });
  it('when request fail return user null and isAuthenticated false', async () => {
    mockGet.mockRejectedValueOnce(Error(''));
    const { result } = renderHook(() => useUserInfo());
    expect(result.current.loading).toBe(true);
    expect(result.current.user).toBe(null);
    await waitFor(() => {
      expect(result.current.user).toBe(null);
      expect(result.current.loading).toBe(false);
      expect(result.current.isAuthenticated).toBe(false);
    });
  });
});
