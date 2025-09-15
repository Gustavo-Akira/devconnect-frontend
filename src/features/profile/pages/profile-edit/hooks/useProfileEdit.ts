import { useEffect, useState } from 'react';
import { useAuth } from '../../../../../shared/context/auth/authContext';
import type { Address, User } from '../../../../../shared/types/user';
import { useNavigate } from 'react-router-dom';
import { AUTH_PATHS } from '../../../../auth/route';
import { updateProfile } from '../../../../../shared/infra/services/profile/profileService';

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
    try {
      await updateProfile({
        id: profileData?.id ?? '',
        name: profileData?.name ?? '',
        email: profileData?.email ?? '',
        street: profileData?.address.street ?? '',
        city: profileData?.address.city ?? '',
        zipCode: profileData?.address.zipCode ?? '',
        state: profileData?.address.state ?? '',
        country: profileData?.address.country ?? '',
        githubLink: profileData?.githubLink ?? '',
        linkedinLink: profileData?.linkedinLink ?? '',
        bio: profileData?.bio ?? '',
        stack: profileData?.stack ?? [],
      });
    } catch (error) {
      setError((error as Error).message);
    }
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
