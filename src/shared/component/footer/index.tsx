import { GitHub, LinkedIn, Email } from '@mui/icons-material';
import {
  Box,
  Container,
  IconButton,
  Typography,
  useTheme,
} from '@mui/material';

export const Footer = () => {
  const { palette } = useTheme();
  const sx = {
    cusor: 'pointer',
    color: palette.primary.contrastText,
  };
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'primary.main',
        color: 'white',
        py: 4,
        textAlign: 'center',
      }}
      role="contentinfo"
    >
      <Container>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <IconButton
            href="https://github.com/Gustavo-Akira/devconnect"
            target="_blank"
            role="link"
            aria-label="github"
          >
            <GitHub sx={sx} />
          </IconButton>
          <IconButton
            href="https://www.linkedin.com/in/gustavo-akira-uekita/"
            target="_blank"
            role="link"
            aria-label="linkedin"
          >
            <LinkedIn sx={sx} />
          </IconButton>
          <IconButton
            href="mailto:akirauekita2002@gmail.com"
            target="_blank"
            role="link"
            aria-label="email"
          >
            <Email sx={sx} />
          </IconButton>
        </Box>
        <Typography variant="body2" sx={{ mt: 2 }}>
          {new Date().getFullYear()} DevConnect - Gustavo Akira Uekita
        </Typography>
      </Container>
    </Box>
  );
};
