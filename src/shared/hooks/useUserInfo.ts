import { useEffect, useState } from 'react';
import { api } from '../infra/api';
import type { User } from '../types/user';

export function useUserInfo() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get<User>('/v1/dev-profiles/profile')
      .then((res) => setUser(res.data))
      .catch((err) => {
        console.log(err);
        setUser(null);
      })
      .finally(() => setLoading(false));
  }, []);

  return { user, loading, isAuthenticated: !!user };
}
