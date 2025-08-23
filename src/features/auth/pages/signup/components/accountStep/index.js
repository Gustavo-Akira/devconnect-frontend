import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { TextField } from '@mui/material';
export const AccountStep = ({ onChange, data }) => {
    return (_jsxs(_Fragment, { children: [_jsx(TextField, { value: data.name, label: "Nome", onChange: (e) => onChange('name', e.target.value), required: true }), _jsx(TextField, { type: "email", name: "email", value: data.email, onChange: (e) => onChange('email', e.target.value), label: "Email", required: true }), _jsx(TextField, { type: "password", value: data.password, name: "password", label: "Senha", onChange: (e) => onChange('password', e.target.value), required: true }), _jsx(TextField, { type: "password", value: data.confirmPassword, name: "confirmPassword", label: "Confirmar Senha", onChange: (e) => onChange('confirmPassword', e.target.value), required: true })] }));
};
