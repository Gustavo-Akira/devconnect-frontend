import { api } from '../../api';
import type { SignupRequest } from './types';

export const signup = async (request: SignupRequest) => {
  console.log('Signup request data:', request);
  try {
    const { data } = await api.post('v1/dev-profiles', request);
    return data;
  } catch (error) {
    console.error('Error during signup:', error);
    throw error;
  }
};
