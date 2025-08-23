import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { TextField } from '@mui/material';
export const DevInfoStep = ({ onChange, data }) => {
    return (_jsxs(_Fragment, { children: [_jsx(TextField, { value: data.githubLink, label: "Link do Github", onChange: (e) => onChange('githubLink', e.target.value), required: true }), _jsx(TextField, { value: data.linkedinLink, label: "Link do Linkedin", onChange: (e) => onChange('linkedinLink', e.target.value), required: true }), _jsx(TextField, { value: data.bio, label: "Bio", onChange: (e) => onChange('bio', e.target.value), required: true }), _jsx(TextField, { value: data.stack.join(', '), label: "Stack", onChange: (e) => onChange('stack', e.target.value.split(',').map((item) => item.trim())), required: true })] }));
};
