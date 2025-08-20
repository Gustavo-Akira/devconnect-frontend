import {
  Box,
  Button,
  Container,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import { useState } from 'react';
import { AccountStep } from './components/accountStep';
import { AddressStep } from './components/addressStep';
import { DevInfoStep } from './components/devInfoStep';

export const Signup = () => {
  const steps = ['Informações Pessoais', 'Dados de Acesso', 'Confirmação'];
  const [activeStep, setActiveStep] = useState(0);
  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    address: '',
    number: '',
    complement: '',
    neighborhood: '',
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
  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <AccountStep onChange={() => {}} data={formData} />;
      case 1:
        return (
          <AddressStep
            onChange={(field, value) =>
              setFormData({ ...formData, [field]: value })
            }
            data={formData}
          />
        );
      case 2:
        return (
          <DevInfoStep
            onChange={(field, value) =>
              setFormData({ ...formData, [field]: value })
            }
            data={formData}
          />
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <>
      <Box component="section" sx={{ padding: 2 }}>
        <Container maxWidth="sm">
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Container>
      </Box>
      <Box sx={{ padding: 2 }}>
        <Container maxWidth="sm">
          <form method="post">
            <Box display="flex" flexDirection="column" gap={2}>
              {renderStepContent(activeStep)}
            </Box>
          </form>
          <Box display="flex" justifyContent="space-between" mt={4}>
            <Button disabled={activeStep === 0} onClick={handleBack}>
              Voltar
            </Button>
            {activeStep === steps.length - 1 ? (
              <Button variant="contained" color="primary" onClick={() => {}}>
                Finalizar
              </Button>
            ) : (
              <Button variant="contained" onClick={handleNext}>
                Próximo
              </Button>
            )}
          </Box>
        </Container>
      </Box>
    </>
  );
};
