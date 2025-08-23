import {
  Box,
  Button,
  Container,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import { AccountStep } from './components/accountStep';
import { AddressStep } from './components/addressStep';
import { DevInfoStep } from './components/devInfoStep';
import { useSignupPage } from './hooks/useSignupPage';

export const Signup = () => {
  const { actions, state } = useSignupPage();
  const { formData, steps, activeStep } = state;
  const { setFormData, handleBack, handleNext, handleSignup } = actions;

  const stepComponents = [AccountStep, AddressStep, DevInfoStep];
  const CurrentStepComponent = stepComponents[activeStep];

  const handleStepChange = (field: string, value: string | string[]) => {
    setFormData({ ...formData, [field]: value });
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
              <CurrentStepComponent
                data={formData}
                onChange={handleStepChange}
              />
            </Box>
          </form>
          <Box display="flex" justifyContent="space-between" mt={4}>
            <Button disabled={activeStep === 0} onClick={handleBack}>
              Voltar
            </Button>
            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                color="primary"
                onClick={handleSignup}
              >
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
