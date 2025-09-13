import type { JSX } from '@emotion/react/jsx-runtime';
import { Grid, Typography } from '@mui/material';

export const InfoContainer = (info: {
  label: string;
  value: JSX.Element[] | JSX.Element;
  size?: { xs: number; md: number; lg: number };
}) => {
  const size = info.size ? info.size : { xs: 12, md: 6, lg: 6 };
  return (
    <Grid size={size}>
      <Typography fontWeight={'bold'}>{info.label}:</Typography>
      {info.value}
    </Grid>
  );
};
