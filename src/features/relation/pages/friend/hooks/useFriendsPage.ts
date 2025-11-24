import { useEffect, useState } from 'react';
import type { Recommendations } from '../../../../../shared/infra/services/relation/interface';
import { useAuth } from '../../../../../shared/context/auth/authContext';
import { getRecommendationsByProfile } from '../../../../../shared/infra/services/relation/recommendationService';

export const useFriendsPage = () => {
  const { user } = useAuth();
  const [recommendations, setRecommendations] = useState<Recommendations[]>([]);
  useEffect(() => {
    const userId = Number.parseInt(user!.id);
    getRecommendationsByProfile(userId)
      .then((data) => {
        setRecommendations(data);
        console.log('data ' + JSON.stringify(data));
      })
      .catch((error) => {
        console.error(error);
      });
  }, [user]);

  return {
    state: {
      recommendations,
    },
  };
};
