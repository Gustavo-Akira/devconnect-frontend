import { useCallback, useEffect, useState } from 'react';
import type {
  Relation,
  RelationsResponse,
} from '../../../../../shared/infra/services/relation/interface';
import {
  getAllRelationsByUser,
  blockUser,
  getAllPendingRelationsByUser,
  acceptRelationRequest,
} from '../../../../../shared/infra/services/relation/relationService';
import { useAuth } from '../../../../../shared/context/auth/authContext';

export const useRelationPage = () => {
  const { user } = useAuth();
  const [relations, setRelations] = useState<RelationsResponse>();
  const [loading, setLoading] = useState<boolean>();
  const [page, setPage] = useState<number>(0);
  const [pendingRequests, setPendingRequests] = useState<Relation[]>();
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
  const fetchPendingRequests = useCallback(() => {
    const userId = Number.parseInt(user!.id);
    getAllPendingRelationsByUser(userId)
      .then((relations) => {
        setPendingRequests(relations);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [user]);

  useEffect(() => {
    fetchPendingRequests();
  }, [fetchPendingRequests]);

  const acceptFriendRequest = (id: number) => {
    const userId = Number.parseInt(user!.id);
    acceptRelationRequest(userId, id).then(() => {
      fetchPendingRequests();
      setPage(0);
    });
  };

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
      pendingRequests,
    },
    actions: {
      blockAction,
      profileAction,
      handlePageChange,
      acceptFriendRequest,
    },
  };
};
