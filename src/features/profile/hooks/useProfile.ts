import { useEffect, useState } from 'react';
import type { User } from '../../../shared/types/user';
import { getProfileById } from '../../../shared/infra/services/profile/profileService';
import { getProjectsByDevProfileId } from '../../../shared/infra/services/projects/projectService';
import type { ProjectResponse } from '../../../shared/infra/services/projects/interface';

export const useProfile = (id?: string) => {
  const [profile, setProfile] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>(null);
  const [projects, setProjects] = useState<ProjectResponse | undefined>(
    undefined,
  );
  const [page, setPage] = useState<number>(0);
  const [size, setSize] = useState<number>(20);
  useEffect(() => {
    if (!id) return;
    let mounted = true;
    setLoading(true);
    Promise.all([getProjectsByDevProfileId(id, page, size), getProfileById(id)])
      .then(([projectsData, profileData]) => {
        if (mounted) {
          setProjects(projectsData);
          setProfile(profileData);
        }
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
  }, [id, page, size]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleSizeChange = (newSize: number) => {
    setSize(newSize);
    setPage(0);
  };

  return {
    state: { profile, projects, loading, error, page, size },
    actions: {
      handlePageChange,
      handleSizeChange,
    },
  } as const;
};
