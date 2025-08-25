import { Box, Button, Container, TextField, Typography } from '@mui/material';

export const SignIn = () => {
  return (
    <>
      <Box>
        <Box sx={{ padding: 2 }}>
          <Container maxWidth="sm">
            <Typography variant="h4">Login</Typography>
          </Container>
        </Box>
        <Box sx={{ padding: 2 }}>
          <Container maxWidth="sm">
            <form method="post">
              <Box display="flex" flexDirection="column" gap={2}>
                <TextField label="Email" />
                <TextField label="Senha" />
              </Box>
            </form>
            <Box display="flex" justifyContent="space-between" mt={4}>
              <Button onClick={() => {}}>Esqueci minha senha</Button>
              <Button variant="contained" color="primary" onClick={() => {}}>
                Entrar
              </Button>
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  );
};
