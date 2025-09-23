import {
  Button,
  Container,
  Grid,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import type { Project } from '../../../../shared/infra/services/projects/interface';
import { Delete, Edit, GitHub } from '@mui/icons-material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';

export const ProjectsPage = () => {
  const rows: Project[] = [
    {
      id: '1',
      name: 'Project One',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam egestas dignissim porttitor. Curabitur non hendrerit lacus, non consequat turpis. Duis quis posuere urna. Nulla sed est sed felis fringilla placerat ut nec turpis. Vivamus tincidunt eros massa, ut facilisis tortor tincidunt id. Pellentesque eu diam nulla. Phasellus at bibendum sem, quis finibus dui. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla eget luctus arcu. Etiam felis enim, feugiat sed mattis eget, ullamcorper ultricies nulla. Duis id felis at velit maximus fringilla. Praesent dignissim pellentesque commodo. Aliquam nec augue sit amet elit ornare fringilla. Integer elit justo, laoreet sed lorem nec, suscipit tincidunt turpis. Donec pellentesque semper tincidunt.',
      repoUrl: 'https://www.github.com/Gustavo-Akira/devconnect',
      owner: {
        id: 'owner1',
        name: 'Owner One',
      },
    },
    {
      id: '2',
      name: 'Project Two',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam egestas dignissim porttitor. Curabitur non hendrerit lacus, non consequat turpis. Duis quis posuere urna. Nulla sed est sed felis fringilla placerat ut nec turpis. Vivamus tincidunt eros massa, ut facilisis tortor tincidunt id. Pellentesque eu diam nulla. Phasellus at bibendum sem, quis finibus dui. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nulla eget luctus arcu. Etiam felis enim, feugiat sed mattis eget, ullamcorper ultricies nulla. Duis id felis at velit maximus fringilla. Praesent dignissim pellentesque commodo. Aliquam nec augue sit amet elit ornare fringilla. Integer elit justo, laoreet sed lorem nec, suscipit tincidunt turpis. Donec pellentesque semper tincidunt.',
      repoUrl: 'https://www.github.com/Gustavo-Akira/devconnect-frontend',
      owner: {
        id: 'owner1',
        name: 'Owner One',
      },
    },
  ];
  const size = 5;
  const page = 1;
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
        rows={rows}
        paginationMode="server"
        paginationModel={{ page, pageSize: size }}
        rowCount={2}
      />
    </Container>
  );
};
