import { createTheme } from '@mui/material/styles';
export const theme = createTheme({
    palette: {
        primary: {
            main: '#7C3AED', // Roxo vibrante principal
            light: '#A78BFA', // Roxo claro para hover/destaques
            dark: '#5B21B6', // Roxo escuro
            contrastText: '#FFFFFF',
        },
        secondary: {
            main: '#F472B6', // Rosa vibrante para contraste criativo
            light: '#FBCFE8',
            dark: '#BE185D',
            contrastText: '#FFFFFF',
        },
        error: {
            main: '#EF4444',
        },
        warning: {
            main: '#F59E0B',
        },
        background: {
            default: '#F9FAFB', // Neutro claro
            paper: '#FFFFFF', // Fundo para cards
        },
        text: {
            primary: '#111827', // Texto escuro
            secondary: '#6B7280', // Texto secundário
        },
    },
    typography: {
        fontFamily: "'Inter', 'Roboto', sans-serif",
        h1: {
            fontWeight: 700,
            fontSize: '3rem',
            letterSpacing: '-0.5px',
        },
        h2: {
            fontWeight: 600,
            fontSize: '2.25rem',
            letterSpacing: '-0.5px',
        },
        body1: {
            fontSize: '1rem',
            lineHeight: 1.6,
        },
        button: {
            textTransform: 'none',
            fontWeight: 600,
            letterSpacing: '0.5px',
        },
    },
    shape: {
        borderRadius: 12,
    },
});
