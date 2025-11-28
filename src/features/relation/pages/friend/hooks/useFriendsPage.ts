import { useEffect, useState } from 'react';
import type { Recommendations } from '../../../../../shared/infra/services/relation/interface';
import { useAuth } from '../../../../../shared/context/auth/authContext';
import { getRecommendationsByProfile } from '../../../../../shared/infra/services/relation/recommendationService';

export const useFriendsPage = () => {
  const { user } = useAuth();
  const [recommendations, setRecommendations] = useState<Recommendations[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  useEffect(() => {
    fetchRecommendations();
  }, [user]);
  const fetchRecommendations = async ()=>{
    const userId = Number.parseInt(user!.id);
    setError("");
    setLoading(true);
    getRecommendationsByProfile(userId)
      .then((data) => {
        setRecommendations(data);
        console.log('data ' + JSON.stringify(data));
      })
      .catch((error) => {
        console.error(error);
        setError(error)
      }).finally(()=>{
        setLoading(false);
      });
  }
  return {
    state: {
      recommendations,
      loading,
      error,
    },
    actions:{
      fetchRecommendations
    }
  };
};
