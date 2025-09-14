import { useEffect, useState } from 'react';
import { useAuth } from '../../../../../shared/context/auth/authContext';
import type { Address, User } from '../../../../../shared/types/user';
import { useNavigate } from 'react-router-dom';
import { AUTH_PATHS } from '../../../../auth/route';

export const useProfileEdit = () => {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState<User>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const navigate = useNavigate();
  useEffect(() => {
    if (!user) {
      navigate(AUTH_PATHS.SIGNUP);
      return;
    }
    setProfileData(user);
  }, [user, navigate]);

  const handleProfileUpdate = async () => {
    setLoading(true);
    setError('Not implemented yet');
    setLoading(false);
  };
  const handleReset = () => {
    setProfileData(user!);
  };

  const changeProperty = (
    property: keyof User | keyof Address,
    value: string,
  ) => {
    if (profileData) {
      if (property in profileData.address) {
        setProfileData({
          ...profileData,
          address: {
            ...profileData.address,
            [property]: value,
          },
        });
      } else {
        setProfileData({
          ...profileData,
          [property]: value,
          id: profileData.id ?? '',
        });
      }
    }
  };

  return {
    state: { profileData, loading, error },
    actions: { changeProperty, handleReset, handleProfileUpdate },
  };
};
