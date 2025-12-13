import { useCallback, useEffect, useState } from 'react';
import type { RelationsResponse } from '../../../../../shared/infra/services/relation/interface';
import {
  getAllRelationsByUser,
  blockUser,
} from '../../../../../shared/infra/services/relation/relationService';
import { useAuth } from '../../../../../shared/context/auth/authContext';

export const useRelationPage = () => {
  const { user } = useAuth();
  const [relations, setRelations] = useState<RelationsResponse>();
  const [loading, setLoading] = useState<boolean>();
  useEffect(() => {
    const userId = Number.parseInt(user!.id);
    setLoading(true);
    getAllRelationsByUser(userId)
      .then((relations) => {
        setRelations(relations);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user]);
  const blockAction = useCallback(
    (id: number) => {
      const userId = parseInt(user!.id);
      blockUser(userId, id).then(() => {});
    },
    [user],
  );
  const profileAction = (id: number) => {
    console.log(id);
  };
  return {
    state: {
      relations,
      loading,
    },
    actions: {
      blockAction,
      profileAction,
    },
  };
};
