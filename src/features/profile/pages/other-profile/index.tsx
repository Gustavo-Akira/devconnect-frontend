import {
  Grid,
  Typography,
  Chip,
  Link,
  Container,
  Tooltip,
  IconButton,
  Button,
} from '@mui/material';
import { useMemo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useOtherProfilePage } from './hooks/useProfile';
import { InfoContainer } from '../../components/infoContainer';
import { GitHub, LinkedIn } from '@mui/icons-material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';

export const OtherProfilePage = () => {
  const { id } = useParams();
  const { state, actions } = useOtherProfilePage(id);

  const getRelationStatusText = useCallback(() => {
    if (!state.relation) return 'Adicionar Amigo';
    switch (state.relation.Type) {
      case 'FRIEND':
        if (
          Number(state.relation.ToID) === state.loggedId &&
          state.relation.Status === 'PENDING'
        ) {
          return 'Aceitar Solicitação';
        }

        return state.relation.Status === 'PENDING'
          ? 'Solicitação Pendente'
          : 'Bloquear';
      case 'BLOCK':
        return 'Bloqueado';
    }
  }, [state.relation, state.loggedId]);

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
  const columns = useMemo<GridColDef[]>(
    () => [
      { field: 'name', headerName: 'Name', flex: 1, minWidth: 150 },
      {
        field: 'description',
        headerName: 'Description',
        flex: 2,
        minWidth: 250,
      },
      {
        field: 'actions',
        headerName: 'Actions',
        flex: 1,
        sortable: false,
        filterable: false,
        renderCell: (params) => (
          <Tooltip title="Open Repository">
            <IconButton
              href={params.row.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHub />
            </IconButton>
          </Tooltip>
        ),
      },
    ],
    [],
  );

  const colorMap = useMemo(() => {
    if (!state.profile?.stack) return {} as Record<string, Color>;
    return Object.fromEntries(
      state.profile.stack.map((s) => [s, colors[hashToIndex(s)]]),
    ) as Record<string, Color>;
  }, [state.profile?.stack, colors, hashToIndex]);

  if (state.loading) {
    return <Typography>Carregando...</Typography>;
  }

  if (!state.profile) {
    return <Typography>Perfil não encontrado</Typography>;
  }
  return (
    <>
      {state.profile && (
        <Container style={{ minHeight: '80vh' }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <Typography variant="h4">{state.profile.name} </Typography>
              <Typography color="text.secondary">
                {state.profile.bio}
              </Typography>
            </Grid>
            <Grid size={{ xs: 12 }}>
              {state.relation && (
                <Button
                  variant="contained"
                  disabled={state.relation.Status === 'ACCEPTED'}
                  data-testid="relation-button"
                  onClick={actions.handleButtonClick}
                >
                  {getRelationStatusText()}
                </Button>
              )}

              {state.relation === undefined && (
                <Button variant="contained" onClick={actions.handleButtonClick}>
                  {getRelationStatusText()}
                </Button>
              )}
            </Grid>
            <Grid size={{ xs: 12 }}>
              <InfoContainer
                label="Stack"
                value={state.profile.stack.map((s) => (
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
                      href={state.profile.githubLink}
                      target="_blank"
                      rel="noopener"
                    >
                      <GitHub aria-label="GitHub profile" />
                    </Link>
                    <Link
                      href={state.profile.linkedinLink}
                      target="_blank"
                      rel="noopener"
                    >
                      <LinkedIn aria-label="LinkedIn profile" />
                    </Link>
                  </div>
                }
              />
            </Grid>
          </Grid>
          <DataGrid
            data-testid="projects-grid"
            columns={columns}
            rows={state.projects ? state.projects.content : []}
            paginationMode="server"
            paginationModel={{
              page: state.page,
              pageSize: state.projects?.size || 20,
            }}
            rowCount={state.projects?.totalElements || 0}
            onPaginationModelChange={(model) => {
              if (model.page !== state.page) {
                actions.handlePageChange(model.page);
              }
              if (model.pageSize !== state.size) {
                actions.handleSizeChange(model.pageSize);
              }
            }}
            getRowId={(row) => row.id}
            loading={state.loading}
          />
        </Container>
      )}
    </>
  );
};
