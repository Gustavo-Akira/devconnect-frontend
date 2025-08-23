import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { GitHub, LinkedIn, Email } from '@mui/icons-material';
import { Box, Container, IconButton, Typography, useTheme, } from '@mui/material';
export const Footer = () => {
    const { palette } = useTheme();
    const sx = {
        cusor: 'pointer',
        color: palette.primary.contrastText,
    };
    return (_jsx(Box, { component: "footer", sx: {
            bgcolor: 'primary.main',
            color: 'white',
            py: 4,
            textAlign: 'center',
        }, role: "contentinfo", children: _jsxs(Container, { children: [_jsxs(Box, { sx: { display: 'flex', justifyContent: 'center', gap: 2 }, children: [_jsx(IconButton, { href: "https://github.com/Gustavo-Akira/devconnect", target: "_blank", role: "link", "aria-label": "github", children: _jsx(GitHub, { sx: sx }) }), _jsx(IconButton, { href: "https://www.linkedin.com/in/gustavo-akira-uekita/", target: "_blank", role: "link", "aria-label": "linkedin", children: _jsx(LinkedIn, { sx: sx }) }), _jsx(IconButton, { href: "mailto:akirauekita2002@gmail.com", target: "_blank", role: "link", "aria-label": "email", children: _jsx(Email, { sx: sx }) })] }), _jsxs(Typography, { variant: "body2", sx: { mt: 2 }, children: [new Date().getFullYear(), " DevConnect - Gustavo Akira Uekita"] })] }) }));
};
