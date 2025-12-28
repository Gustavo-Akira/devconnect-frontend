import { useEffect, useState } from 'react';
import type { User } from '../../../../../shared/types/user';
import { getProfileById } from '../../../../../shared/infra/services/profile/profileService';
import { getProjectsByDevProfileId } from '../../../../../shared/infra/services/projects/projectService';
import {
  acceptRelationRequest,
  blockUser,
  getRelationByFromIdAndToId,
  requestFriendShip,
} from '../../../../../shared/infra/services/relation/relationService';
import type { Relation } from '../../../../../shared/infra/services/relation/interface';
import type { ProjectResponse } from '../../../../../shared/infra/services/projects/interface';
import { useAuth } from '../../../../../shared/context/auth/authContext';
import { useNotification } from '../../../../../shared/context/notification/notificationContext';

export const useOtherProfilePage = (id?: string) => {
  const [profile, setProfile] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>(null);
  const [projects, setProjects] = useState<ProjectResponse | undefined>(
    undefined,
  );
  const [relation, setRelation] = useState<Relation | undefined>(undefined);
  const { user } = useAuth();
  const userInfo = user!;
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(20);

  const { showNotification } = useNotification();
  useEffect(() => {
    if (!id) return;
    let mounted = true;
    setLoading(true);
    const promises: Promise<unknown>[] = [
      getProjectsByDevProfileId(id, page, size),
      getProfileById(id),
      getRelationByFromIdAndToId(Number(userInfo?.id), Number(id)),
    ];

    Promise.all(promises)
      .then((results) => {
        if (!mounted) return;
        const [projectsData, profileData, maybeRelation] = results as [
          ProjectResponse,
          User,
          Relation | undefined,
        ];
        setProjects(projectsData);
        setProfile(profileData);
        if (maybeRelation) setRelation(maybeRelation);
      })
      .catch((err) => {
        if (mounted) setError(err);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [id, page, size, userInfo?.id]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleSizeChange = (newSize: number) => {
    setSize(newSize);
    setPage(0);
  };

  const handleButtonClick = () => {
    if (!relation || relation === ({} as Relation)) {
      requestFriendShip(Number(userInfo?.id), Number(id)).then(
        (newRelation) => {
          setRelation(newRelation);
          showNotification('Pedido de amizade enviado.', 'success');
        },
      );
    } else {
      if (relation.Type === 'BLOCK') {
        return;
      }
      switch (relation?.Status) {
        case 'PENDING':
          if (relation.ToID !== Number(userInfo?.id)) {
            showNotification('Pedido de amizade já enviado.', 'error');
            return;
          }
          acceptRelationRequest(Number(userInfo?.id), Number(id)).then(() => {
            setRelation((prev) =>
              prev ? { ...prev, Status: 'ACCEPTED' } : prev,
            );
            showNotification('Pedido de amizade aceito.', 'success');
          });
          break;
        case 'ACCEPTED':
          blockUser(Number(userInfo?.id), Number(id)).then(
            (blockedRelation) => {
              setRelation(blockedRelation);
              showNotification('Usuário bloqueado.', 'success');
            },
          );
          break;
      }
    }
  };

  return {
    state: {
      profile,
      projects,
      loading,
      error,
      page,
      size,
      relation,
      loggedId: Number(userInfo?.id),
    },
    actions: {
      handlePageChange,
      handleSizeChange,
      handleButtonClick,
    },
  } as const;
};
