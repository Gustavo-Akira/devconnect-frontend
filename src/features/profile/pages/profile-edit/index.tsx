import {
  Button,
  Container,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useProfileEdit } from './hooks/useProfileEdit';

export const EditProfilePage = () => {
  const { actions, state } = useProfileEdit();

  return (
    <Container style={{ marginTop: '2rem', marginBottom: '2rem' }}>
      <Grid container spacing={2} rowGap={4}>
        <Grid size={{ xs: 12 }}>
          <Typography variant="h4">Editar Perfil</Typography>
        </Grid>
        <Grid container size={{ xs: 12 }} rowGap={5}>
          <Grid size={{ xs: 12, md: 6, lg: 6 }}>
            <TextField
              name="name"
              onChange={(e) => {
                actions.changeProperty('name', e.target.value);
              }}
              label="Nome"
              value={state.profileData?.name}
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6, lg: 6 }}>
            <TextField
              name="email"
              onChange={(e) => {
                actions.changeProperty('email', e.target.value);
              }}
              label="Email"
              value={state.profileData?.email}
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6, lg: 6 }}>
            <TextField
              name="githubLink"
              onChange={(e) => {
                actions.changeProperty('githubLink', e.target.value);
              }}
              label="Github"
              value={state.profileData?.githubLink}
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6, lg: 6 }}>
            <TextField
              name="linkedinLink"
              onChange={(e) => {
                actions.changeProperty('linkedinLink', e.target.value);
              }}
              label="Linkedin"
              value={state.profileData?.linkedinLink}
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, md: 12, lg: 12 }}>
            <TextField
              name="stack"
              onChange={(e) => {
                actions.changeProperty('stack', e.target.value);
              }}
              label="Stack"
              value={state.profileData?.stack.join(', ')}
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, md: 12, lg: 12 }}>
            <TextField
              name="bio"
              onChange={(e) => {
                actions.changeProperty('bio', e.target.value);
              }}
              label="Bio"
              value={state.profileData?.bio}
              fullWidth
            />
          </Grid>
        </Grid>
        <Divider />
        <Grid container size={{ xs: 12 }}>
          <Grid size={{ xs: 12 }}>
            <Typography variant="h5">Endereço</Typography>
          </Grid>
          <Grid size={{ xs: 12 }}>
            <TextField
              name="zipCode"
              onChange={(e) => {
                actions.changeProperty('zipCode', e.target.value);
              }}
              label="CEP"
              value={state.profileData?.address.zipCode}
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, md: 12, lg: 12 }}>
            <TextField
              name="street"
              onChange={(e) => {
                actions.changeProperty('street', e.target.value);
              }}
              label="Endereço"
              value={state.profileData?.address.street}
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <TextField
              name="city"
              onChange={(e) => {
                actions.changeProperty('city', e.target.value);
              }}
              label="Cidade"
              value={state.profileData?.address.city}
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <TextField
              name="state"
              onChange={(e) => {
                actions.changeProperty('state', e.target.value);
              }}
              label="Estado"
              value={state.profileData?.address.state}
              fullWidth
            />
          </Grid>
          <Grid size={{ xs: 12, md: 6, lg: 4 }}>
            <TextField
              name="country"
              onChange={(e) => {
                actions.changeProperty('country', e.target.value);
              }}
              label="País"
              value={state.profileData?.address.country}
              fullWidth
            />
          </Grid>
        </Grid>
        {state.error && (
          <Grid size={{ xs: 12 }}>
            <Typography color="error">{state.error}</Typography>
          </Grid>
        )}
        <Grid container justifyContent="flex-end" size={{ xs: 12 }}>
          <Stack direction="row" spacing={2}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              loading={state.loading}
              onClick={actions.handleProfileUpdate}
            >
              Atualizar
            </Button>
            <Button
              type="button"
              variant="outlined"
              color="secondary"
              onClick={actions.handleReset}
            >
              Resetar
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};
