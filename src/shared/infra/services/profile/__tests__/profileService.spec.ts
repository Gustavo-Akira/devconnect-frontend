import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { getProfileById, updateProfile } from '../profileService';
import { api } from '../../../api';
import type { User } from '../../../../types/user';

vi.mock('../../../api', () => ({
  api: {
    put: vi.fn(),
    get: vi.fn(),
  },
}));

describe('updateProfile', () => {
  const mockUser: User = {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    githubLink: 'https://github.com/johndoe',
    linkedinLink: 'https://linkedin.com/in/johndoe',
    stack: ['React'],
    bio: 'Software Developer',
    address: {
      zipCode: '12345-678',
      street: 'Rua das Flores',
      city: 'São Paulo',
      state: 'SP',
      country: 'Brasil',
    },
    isActive: true,
  };

  const mockRequest = {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    githubLink: 'https://github.com/johndoe',
    linkedinLink: 'https://linkedin.com/in/johndoe',
    stack: ['React'],
    bio: 'Software Developer',
    zipCode: '12345-678',
    street: 'Rua das Flores',
    city: 'São Paulo',
    state: 'SP',
    country: 'Brasil',
  };

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should return data when api call succeeds', async () => {
    (api.put as Mock).mockResolvedValueOnce({ data: mockUser });

    const result = await updateProfile(mockRequest);

    expect(api.put).toHaveBeenCalledWith('/v1/dev-profiles', mockRequest);
    expect(result).toEqual(mockUser);
  });

  it('should throw error when api call fails', async () => {
    const error = new Error('Network error');
    (api.put as Mock).mockRejectedValueOnce(error);
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    await expect(updateProfile(mockRequest)).rejects.toThrow('Network error');

    expect(api.put).toHaveBeenCalledWith('/v1/dev-profiles', mockRequest);
    expect(consoleSpy).toHaveBeenCalledWith('Error updating profile:', error);

    consoleSpy.mockRestore();
  });
});

describe('getProfileById', () => {
  const mockUser: User = {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    githubLink: 'https://github.com/johndoe',
    linkedinLink: 'https://linkedin.com/in/johndoe',
    stack: ['React'],
    bio: 'Software Developer',
    address: {
      zipCode: '12345-678',
      street: 'Rua das Flores',
      city: 'São Paulo',
      state: 'SP',
      country: 'Brasil',
    },
    isActive: true,
  };
  it('should get profile when api call succeeds', async () => {
    (api.get as Mock).mockResolvedValueOnce({ data: mockUser });

    const result = await getProfileById('1');

    expect(api.get).toHaveBeenCalledWith('/v1/dev-profiles/1');
    expect(result).toEqual(mockUser);
  });

  it('should throw error when api call fails', async () => {
    const error = new Error('Network error');
    (api.get as Mock).mockRejectedValueOnce(error);
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    await expect(getProfileById('1')).rejects.toThrow('Network error');

    expect(api.get).toHaveBeenCalledWith('/v1/dev-profiles/1');
    expect(consoleSpy).toHaveBeenCalledWith(
      'Error fetching profile by id:',
      error,
    );

    consoleSpy.mockRestore();
  });
});
