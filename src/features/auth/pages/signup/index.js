import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Box, Button, Container, Stepper, Step, StepLabel, } from '@mui/material';
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
    const handleStepChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };
    return (_jsxs(_Fragment, { children: [_jsx(Box, { component: "section", sx: { padding: 2 }, children: _jsx(Container, { maxWidth: "sm", children: _jsx(Stepper, { activeStep: activeStep, alternativeLabel: true, children: steps.map((label) => (_jsx(Step, { children: _jsx(StepLabel, { children: label }) }, label))) }) }) }), _jsx(Box, { sx: { padding: 2 }, children: _jsxs(Container, { maxWidth: "sm", children: [_jsx("form", { method: "post", children: _jsx(Box, { display: "flex", flexDirection: "column", gap: 2, children: _jsx(CurrentStepComponent, { data: formData, onChange: handleStepChange }) }) }), _jsxs(Box, { display: "flex", justifyContent: "space-between", mt: 4, children: [_jsx(Button, { disabled: activeStep === 0, onClick: handleBack, children: "Voltar" }), activeStep === steps.length - 1 ? (_jsx(Button, { variant: "contained", color: "primary", onClick: handleSignup, children: "Finalizar" })) : (_jsx(Button, { variant: "contained", onClick: handleNext, children: "Pr\u00F3ximo" }))] })] }) })] }));
};
