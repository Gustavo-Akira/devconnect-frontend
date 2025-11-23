import { relationApi } from '../../api';
import type { Recommendations } from './interface';

export const getRecommendationsByProfile = async (id: number) => {
  try {
    const { data } = await relationApi.get<Recommendations[]>(
      `/recommendations/${id}`,
    );
    return data;
  } catch (error) {
    console.error('Error getting recommendations:', error);
    throw error;
  }
};
