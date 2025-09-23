import {
  Button,
  Container,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import { Delete, Edit, GitHub } from '@mui/icons-material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useProjectsPage } from './hooks/useProjectsPage';

export const ProjectsPage = () => {
  const { state, actions } = useProjectsPage();
  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', flex: 1, minWidth: 150 },
    { field: 'description', headerName: 'Description', flex: 2, minWidth: 250 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <>
          <Tooltip title="Edit Project">
            <IconButton onClick={() => console.log('Edit', params.row.id)}>
              <Edit color="warning" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete Project">
            <IconButton onClick={() => console.log('Delete', params.row.id)}>
              <Delete color="error" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Open Repository">
            <IconButton href={params.row.repoUrl} target="_blank">
              <GitHub />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  return (
    <Container>
      <Grid mt={4} container>
        <Grid size={10}>
          <Typography justifySelf="flex-start" variant="h4" gutterBottom>
            Projects
          </Typography>
        </Grid>
        <Grid size={2}>
          <Button variant="outlined" color="primary">
            Add New Project
          </Button>
        </Grid>
      </Grid>
      <DataGrid
        columns={columns}
        rows={state.projects}
        paginationMode="server"
        paginationModel={{ page: state.page, pageSize: state.size }}
        rowCount={state.totalElements}
        onPaginationModelChange={(model) => {
          if (model.page !== state.page) {
            console.log(model.page);
            actions.handlePageChange(model.page);
          }
          if (model.pageSize !== state.size) {
            console.log(model.pageSize);
            actions.handleSizeChange(model.pageSize);
          }
        }}
        loading={state.loading}
      />
    </Container>
  );
};
