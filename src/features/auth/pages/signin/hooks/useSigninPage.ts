import { useState } from 'react';
import { signin } from '../../../../../shared/infra/services/auth/authService';
import { useNavigate } from 'react-router-dom';
import { PROFILE_PATHS } from '../../../../profile/route';
import { useAuth } from '../../../../../shared/context/auth/authContext';

export const useSigninPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleForgotPassword = () => {
    console.log('Recuperação de senha solicitada para:', email);
  };

  const handleSignIn = () => {
    if (!password || !email) {
      setError('Email e senha são obrigatórios.');
      return;
    }
    setLoading(true);
    setError(null);
    console.log('Tentativa de login com:', { email, password });
    signin(email, password)
      .then(async () => {
        await login();
        navigate(PROFILE_PATHS.PROFILE);
      })
      .catch((error) => {
        console.error('Erro no login:', error);
        setError(
          'Falha no login. Verifique suas credenciais e tente novamente.',
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return {
    state: {
      email,
      password,
      loading,
      error,
    },
    actions: {
      handleForgotPassword,
      handleSignIn,
      setEmail,
      setPassword,
    },
  };
};
