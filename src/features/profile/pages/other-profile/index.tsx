import { Grid, Typography, Chip, Link, Container } from '@mui/material';
import { useMemo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useProfile } from '../../hooks/useProfile';
import { InfoContainer } from '../../components/infoContainer';
import { GitHub, LinkedIn } from '@mui/icons-material';

export const OtherProfilePage = () => {
  const { id } = useParams();
  const { profile, loading } = useProfile(id);

  type Color =
    | 'primary'
    | 'secondary'
    | 'error'
    | 'warning'
    | 'info'
    | 'success';

  const colors = useMemo<readonly Color[]>(
    () =>
      ['primary', 'secondary', 'error', 'warning', 'info', 'success'] as const,
    [],
  );

  const hashToIndex = useCallback(
    (s: string) =>
      [...s].reduce((acc, ch) => acc + ch.charCodeAt(0), 0) % colors.length,
    [colors],
  );

  const colorMap = useMemo(() => {
    if (!profile?.stack) return {} as Record<string, Color>;
    return Object.fromEntries(
      profile.stack.map((s) => [s, colors[hashToIndex(s)]]),
    ) as Record<string, Color>;
  }, [profile?.stack, colors, hashToIndex]);

  return (
    <>
      {loading && <Typography>Carregando...</Typography>}
      {!profile && <Typography>Perfil não encontrado</Typography>}
      {profile && (
        <Container style={{ minHeight: '80vh' }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <Typography variant="h4">{profile.name}</Typography>
              <Typography color="text.secondary">{profile.bio}</Typography>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <InfoContainer
                label="Stack"
                value={profile.stack.map((s) => (
                  <Chip
                    color={colorMap[s] ?? 'default'}
                    key={s}
                    label={s}
                    size="small"
                    style={{ marginRight: 4 }}
                  />
                ))}
              />
              <InfoContainer
                label="Redes Sociais"
                value={
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <Link
                      href={profile.githubLink}
                      target="_blank"
                      rel="noopener"
                    >
                      <GitHub />
                    </Link>
                    <Link
                      href={profile.linkedinLink}
                      target="_blank"
                      rel="noopener"
                    >
                      <LinkedIn />
                    </Link>
                  </div>
                }
              />
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  );
};
