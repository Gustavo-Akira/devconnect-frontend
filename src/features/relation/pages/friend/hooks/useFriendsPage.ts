import { useCallback, useEffect, useState } from 'react';
import type { Recommendations } from '../../../../../shared/infra/services/relation/interface';
import { useAuth } from '../../../../../shared/context/auth/authContext';
import {
  getRecommendationsByProfile,
  requestFriendShip,
} from '../../../../../shared/infra/services/relation/recommendationService';

export const useFriendsPage = () => {
  const { user } = useAuth();
  const [recommendations, setRecommendations] = useState<Recommendations[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const fetchRecommendations = useCallback(async () => {
    const userId = Number.parseInt(user!.id);
    setError('');
    setLoading(true);
    getRecommendationsByProfile(userId)
      .then((data) => {
        setRecommendations(data);
        console.log('data ' + JSON.stringify(data));
      })
      .catch((error) => {
        console.error(error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user]);
  useEffect(() => {
    fetchRecommendations();
  }, [fetchRecommendations]);

  const addFriendShip = useCallback(
    async (toId: number) => {
      const userId = Number.parseInt(user!.id);
      setLoading(true);
      return requestFriendShip(userId, toId)
        .then(() => {
          setRecommendations(
            recommendations.filter(
              (recommendation) => recommendation.ID != toId,
            ),
          );
        })
        .catch((err) => {
          console.error(err);
          setError('Erro ao enviar solicitação');
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [user, recommendations],
  );

  return {
    state: {
      recommendations,
      loading,
      error,
    },
    actions: {
      fetchRecommendations,
      addFriendShip,
    },
  };
};
