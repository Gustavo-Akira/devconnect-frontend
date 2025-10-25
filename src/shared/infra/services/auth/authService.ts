import { api } from '../../api';
import type { SignupRequest } from './types';

export const signup = async (request: SignupRequest) => {
  try {
    const { data } = await api.post('v1/dev-profiles', request);
    return data;
  } catch (error) {
    console.error('Error during signup:', error);
    throw error;
  }
};

export const signin = async (email: string, password: string) => {
  try {
    const { data } = await api.post('v1/auth/login', {
      username: email,
      password,
      grantType: 'password',
    });
    return data;
  } catch (error) {
    console.error('Error during signin:', error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await api.post('v1/auth/logout', {});
  } catch (error) {
    console.error('Error during logout:', error);
    throw error;
  }
};
