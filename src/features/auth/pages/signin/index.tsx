import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { useSigninPage } from './hooks/useSigninPage';

export const SignIn = () => {
  const { actions, state } = useSigninPage();
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
                <TextField
                  name="email"
                  onChange={(e) => actions.setEmail(e.target.value)}
                  label="Email"
                />
                <TextField
                  type="password"
                  name="password"
                  onChange={(e) => actions.setPassword(e.target.value)}
                  label="Senha"
                />
                <Typography color="error">{state.error}</Typography>
              </Box>
            </form>
            <Box display="flex" justifyContent="space-between" mt={4}>
              <Button onClick={actions.handleForgotPassword}>
                Esqueci minha senha
              </Button>
              <Button
                loading={state.loading}
                variant="contained"
                color="primary"
                onClick={actions.handleSignIn}
              >
                Entrar
              </Button>
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  );
};
