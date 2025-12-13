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
  const [page, setPage] = useState<number>(0);
  useEffect(() => {
    const userId = Number.parseInt(user!.id);
    setLoading(true);
    getAllRelationsByUser(userId, page)
      .then((relations) => {
        setRelations(relations);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user, page]);
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

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return {
    state: {
      relations,
      loading,
      page,
    },
    actions: {
      blockAction,
      profileAction,
      handlePageChange,
    },
  };
};
