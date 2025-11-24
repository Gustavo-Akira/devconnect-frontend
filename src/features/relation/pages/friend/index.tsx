import { useEffect, useState } from 'react';
import { useAuth } from '../../../../shared/context/auth/authContext';
import { getRecommendationsByProfile } from '../../../../shared/infra/services/relation/recommendationService';
import type { Recommendations } from '../../../../shared/infra/services/relation/interface';

export const FriendsPage = () => {
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

  return (
    <ul>
      {recommendations.map((recommendation) => (
        <li key={recommendation.ID}>
          {recommendation.Name} - {recommendation.Score}
        </li>
      ))}
    </ul>
  );
};
