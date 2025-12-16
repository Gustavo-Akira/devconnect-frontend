import { Container, IconButton, Tooltip, Typography } from '@mui/material';
import { useRelationPage } from './hooks/useRelationPage';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { Block, Person, Verified } from '@mui/icons-material';

export const RelationPage = () => {
  const { state, actions } = useRelationPage();
  const columns: GridColDef[] = [
    { field: 'ToProfileName', headerName: 'Name', flex: 1, minWidth: 150 },
    { field: 'Type', headerName: 'Type', flex: 1, minWidth: 100 },
    { field: 'Status', headerName: 'Status', flex: 2, minWidth: 250 },

    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <>
          <Tooltip title="Block">
            <IconButton
              disabled={params.row.Type == 'BLOCK'}
              onClick={() => actions.blockAction(params.row.ToID)}
            >
              <Block
                color={params.row.Type != 'BLOCK' ? 'error' : 'disabled'}
              />
            </IconButton>
          </Tooltip>
          <Tooltip title="Open Profile">
            <IconButton onClick={() => actions.profileAction(params.row.ToID)}>
              <Person />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  const pendingRelationColumns: GridColDef[] = [
    { field: 'FromProfileName', headerName: 'Name', flex: 1, minWidth: 150 },
    { field: 'Type', headerName: 'Type', flex: 1, minWidth: 100 },
    { field: 'Status', headerName: 'Status', flex: 2, minWidth: 250 },

    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <>
          <Tooltip title="Accept Profile">
            <IconButton
              onClick={() => actions.acceptFriendRequest(params.row.FromID)}
            >
              <Verified color="success" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Block">
            <IconButton onClick={() => actions.blockAction(params.row.FromID)}>
              <Block color="error" />
            </IconButton>
          </Tooltip>

          <Tooltip title="Open Profile">
            <IconButton onClick={() => actions.profileAction(params.row.ToID)}>
              <Person />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  return (
    <Container>
      <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, mt: 3 }}>
        Amizades e Bloqueios
      </Typography>
      <DataGrid
        columns={columns}
        paginationMode="server"
        rowCount={state.relations?.TotalItems}
        rows={state.relations?.Data}
        loading={state.loading}
        getRowId={(prop) => prop.ToID}
        pageSizeOptions={[20]}
        onPaginationModelChange={(model) => {
          if (model.page !== state.page) {
            console.log(model.page);
            actions.handlePageChange(model.page);
          }
        }}
      />
      <Typography variant="h5" sx={{ mb: 3, mt: 3, fontWeight: 600 }}>
        Pedidos de Amizade
      </Typography>
      <DataGrid
        columns={pendingRelationColumns}
        rows={state.pendingRequests || []}
        loading={state.loading}
        getRowId={(prop) => prop.FromID}
        pageSizeOptions={[20]}
      />
    </Container>
  );
};
