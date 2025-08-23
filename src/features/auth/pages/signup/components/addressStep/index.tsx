import { Grid, TextField } from '@mui/material';
import type { FormStepProps } from '../../interface';

export const AddressStep = ({ onChange, data }: FormStepProps) => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid size={{ xs: 6, sm: 6 }}>
          <TextField
            fullWidth
            value={data.address}
            label="Rua"
            onChange={(e) => onChange('address', e.target.value)}
            required
          />
        </Grid>
        <Grid size={{ xs: 6, sm: 6 }}>
          <TextField
            fullWidth
            value={data.number}
            label="Número"
            onChange={(e) => onChange('number', e.target.value)}
            required
          />
        </Grid>
        <Grid size={{ xs: 6, sm: 6 }}>
          <TextField
            fullWidth
            value={data.city}
            label="Cidade"
            onChange={(e) => onChange('city', e.target.value)}
            required
          />
        </Grid>
        <Grid size={{ xs: 6, sm: 6 }}>
          <TextField
            fullWidth
            value={data.state}
            label="Estado"
            onChange={(e) => onChange('state', e.target.value)}
            required
          />
        </Grid>
        <Grid size={{ xs: 6, sm: 6 }}>
          <TextField
            fullWidth
            value={data.country}
            label="País"
            onChange={(e) => onChange('country', e.target.value)}
            required
          />
        </Grid>
        <Grid size={{ xs: 6, sm: 6 }}>
          <TextField
            fullWidth
            value={data.zipCode}
            label="CEP"
            onChange={(e) => onChange('zipCode', e.target.value)}
            required
          />
        </Grid>
      </Grid>
    </>
  );
};
