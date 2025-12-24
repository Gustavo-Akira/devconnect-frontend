import { useState } from 'react';
import { signup } from '../../../../../shared/infra/services/auth/authService';
import type { SignupRequest } from '../../../../../shared/infra/services/auth/types';
import { useNotification } from '../../../../../shared/context/notification/notificationContext';
import { formatBackendError } from '../../../../../shared/infra/utils/formatBackendError';
export const useSignupPage = () => {
  const { showNotification } = useNotification();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    number: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    githubLink: '',
    linkedinLink: '',
    bio: '',
    stack: [],
    confirmPassword: '',
  });
  const [activeStep, setActiveStep] = useState(0);
  const steps = ['Informações Pessoais', 'Dados de Acesso', 'Confirmação'];

  const handleSignup = () => {
    if (formData.password !== formData.confirmPassword) {
      showNotification('As senhas não coincidem.', 'error');
      return;
    }
    const signupData: SignupRequest = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      street: formData.address + ' ' + formData.number,
      city: formData.city,
      state: formData.state,
      zipCode: formData.zipCode,
      country: formData.country,
      githubLink: formData.githubLink,
      linkedinLink: formData.linkedinLink,
      bio: formData.bio,
      stack: formData.stack,
    };
    signup(signupData)
      .then(() => {
        showNotification('Cadastro realizado com sucesso!', 'success');
      })
      .catch((error) => {
        console.error('Erro ao realizar cadastro:', error);
        showNotification(
          'Erro ao realizar cadastro. Error: ' + formatBackendError(error),
          'error',
        );
      });
  };

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  return {
    actions: {
      handleSignup,
      setFormData,
      setActiveStep,
      handleNext,
      handleBack,
    },
    state: {
      formData,
      steps,
      activeStep,
    },
  };
};
