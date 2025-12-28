import { useCallback, useEffect, useState } from 'react';
import type { Recommendations } from '../../../../../shared/infra/services/relation/interface';
import { useAuth } from '../../../../../shared/context/auth/authContext';
import {
  blockUser,
  getRecommendationsByProfile,
  requestFriendShip,
} from '../../../../../shared/infra/services/relation/relationService';
import { useNotification } from '../../../../../shared/context/notification/notificationContext';

export const useFriendsPage = () => {
  const { user } = useAuth();
  const { showNotification } = useNotification();
  const [recommendations, setRecommendations] = useState<Recommendations[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const fetchRecommendations = useCallback(async () => {
    const userId = Number.parseInt(user!.id);
    setLoading(true);
    getRecommendationsByProfile(userId)
      .then((data) => {
        setRecommendations(data);
        console.log('data ' + JSON.stringify(data));
      })
      .catch((error) => {
        console.error(error);
        showNotification('Erro ao pegar recomendações', 'error');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user, showNotification]);
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
          showNotification('Solicitação de amizade enviada', 'success');
        })
        .catch((err) => {
          console.error(err);
          showNotification('Erro ao enviar solicitação de amizade', 'error');
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [user, recommendations, showNotification],
  );

  const blockUserAction = useCallback(
    async (toId: number) => {
      const userId = Number.parseInt(user!.id);
      setLoading(true);
      return blockUser(userId, toId)
        .then(() => {
          setRecommendations(
            recommendations.filter(
              (recommendation) => recommendation.ID != toId,
            ),
          );
          showNotification('Usuário blockeado com sucesso', 'success');
        })
        .catch((err) => {
          console.error(err);
          showNotification('Erro ao bloquear usuário', 'error');
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [user, recommendations, showNotification],
  );

  return {
    state: {
      recommendations,
      loading,
    },
    actions: {
      fetchRecommendations,
      addFriendShip,
      blockUserAction,
    },
  };
};
