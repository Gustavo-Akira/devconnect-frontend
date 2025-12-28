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
import { useNotification } from '../../../../../shared/context/notification/notificationContext';
import { useNavigate } from 'react-router-dom';

export const useRelationPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [relations, setRelations] = useState<RelationsResponse>();
  const [loading, setLoading] = useState<boolean>();
  const [page, setPage] = useState<number>(0);
  const [pendingRequests, setPendingRequests] = useState<Relation[]>();
  const { showNotification } = useNotification();
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
      showNotification('Amizade aceita com sucesso', 'success');
      setPage(0);
    });
  };

  const blockAction = useCallback(
    (id: number) => {
      const userId = parseInt(user!.id);
      blockUser(userId, id).then(() => {
        setPage(0);
        showNotification('Usuário bloqueado com sucesso', 'success');
      });
    },
    [user, showNotification],
  );
  const profileAction = (id: number) => {
    navigate(`/profile/${id}`);
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
