import type { User } from '../../../types/user';
import { api } from '../../api';
import type { UpdateProfileRequest } from './types';

export const updateProfile = async (profileData: UpdateProfileRequest) => {
  console.log(profileData);
  try {
    const { data } = await api.put<User>('/v1/dev-profiles', profileData);
    return data;
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

export const getProfileById = async (id: string) => {
  try {
    const { data } = await api.get<User>(`/v1/dev-profiles/${id}`);
    return data;
  } catch (error) {
    console.error('Error fetching profile by id:', error);
    throw error;
  }
};
