import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Chip,
  Grid,
  Typography,
} from '@mui/material';
import { useAuth } from '../../../../shared/context/auth/authContext';
import { InfoContainer } from '../../components/infoContainer';
import { ExpandMore } from '@mui/icons-material';
import { PROFILE_PATHS } from '../../route';
import { useNavigate } from 'react-router-dom';

export const InfoPage = () => {
  const { user } = useAuth();
  const userInfo = user!;
  const navigate = useNavigate();
  return (
    <Grid container spacing={2}>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate(PROFILE_PATHS.PROFILE_EDIT)}
      >
        Editar Informações
      </Button>
      <Grid size={{ xs: 12 }}>
        <Accordion defaultExpanded>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="h6" gutterBottom>
              Informações Pessoais
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <InfoContainer
                label="Nome"
                value={<Typography>{userInfo.name}</Typography>}
                size={{ xs: 12, lg: 4, md: 4 }}
              />
              <InfoContainer
                label="Email"
                value={<Typography>{userInfo.email}</Typography>}
                size={{ xs: 12, lg: 4, md: 4 }}
              />
              <InfoContainer
                label="Stack"
                value={userInfo.stack.map((s) => (
                  <Chip key={s} label={s} size="small" />
                ))}
                size={{ xs: 12, lg: 4, md: 4 }}
              />
              <InfoContainer
                label="Github Link"
                value={<Typography>{userInfo.githubLink}</Typography>}
              />
              <InfoContainer
                label="Linkedin Link"
                value={<Typography>{userInfo.linkedinLink}</Typography>}
              />
              <InfoContainer
                label="Bio"
                value={<Typography>{userInfo.bio}</Typography>}
                size={{ xs: 12, lg: 12, md: 12 }}
              />
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Grid>

      <Grid size={{ xs: 12 }}>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMore />}>
            <Typography variant="h6" gutterBottom>
              Endereço
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container>
              <InfoContainer
                label="Rua"
                value={<Typography>{userInfo.address.street}</Typography>}
              />
              <InfoContainer
                label="Cidade"
                value={<Typography>{userInfo.address.city}</Typography>}
              />
              <InfoContainer
                label="Estado"
                value={<Typography>{userInfo.address.state}</Typography>}
              />
              <InfoContainer
                label="País"
                value={<Typography>{userInfo.address.country}</Typography>}
              />
              <InfoContainer
                label="CEP"
                value={<Typography>{userInfo.address.zipCode}</Typography>}
              />
            </Grid>
          </AccordionDetails>
        </Accordion>
      </Grid>
    </Grid>
  );
};
