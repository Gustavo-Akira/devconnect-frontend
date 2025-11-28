import {
  Container,
  Grid,
  Skeleton,
  Typography,
  Box,
  Alert,
  Button,
  AlertTitle,
} from '@mui/material';
import { useFriendsPage } from './hooks/useFriendsPage';
import { ProfileCard } from '../../components/profile-card/profileCard';

export const FriendsPage = () => {
  const { state, actions } = useFriendsPage();

  const { loading, error, recommendations } = state;
  const { fetchRecommendations } = actions;

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600 }}>
        Recomendações para você
      </Typography>

      {loading && (
        <Grid container spacing={3}>
          {[...Array(4)].map((_, i) => (
            <Grid size={{ md: 6, xs: 12 }} key={i}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Skeleton variant="circular" width={64} height={64} />
                <Box sx={{ flex: 1 }}>
                  <Skeleton variant="text" width="40%" height={28} />
                  <Skeleton variant="text" width="60%" height={22} />
                  <Skeleton variant="rectangular" height={30} sx={{ mt: 1 }} />
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}

      {!loading && recommendations.length === 0 && (
        <Typography variant="body1" sx={{ mt: 4 }} color="text.secondary">
          Nenhuma recomendação encontrada no momento.
        </Typography>
      )}

      {error && (
        <Alert severity="error">
          <AlertTitle>Ocorreu um erro ao carregar as recomendações.</AlertTitle>
          <Button color="inherit" size="small" onClick={fetchRecommendations}>
            Tentar novamente
          </Button>
        </Alert>
      )}

      {!loading && recommendations.length > 0 && (
        <Grid container spacing={3}>
          {recommendations.map((rec) => (
            <Grid size={{ md: 6, xs: 12 }} key={rec.ID}>
              <ProfileCard
                name={rec.Name}
                city={rec.City}
                score={rec.Score}
                stacks={rec.Stacks}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};
