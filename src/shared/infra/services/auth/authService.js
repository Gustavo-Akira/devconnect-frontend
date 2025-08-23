import { api } from '../../api';
export const signup = async (request) => {
    console.log('Signup request data:', request);
    try {
        const { data } = await api.post('v1/dev-profiles', request);
        return data;
    }
    catch (error) {
        console.error('Error during signup:', error);
        throw error;
    }
};
