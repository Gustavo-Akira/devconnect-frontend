import { useEffect, useState } from 'react';
import type { User } from '../../../shared/types/user';
import { getProfileById } from '../../../shared/infra/services/profile/profileService';

export const useProfile = (id?: string) => {
  const [profile, setProfile] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    if (!id) return;
    let mounted = true;
    setLoading(true);
    getProfileById(id)
      .then((data) => {
        if (mounted) setProfile(data);
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
  }, [id]);

  return { profile, loading, error } as const;
};
