import { TextField } from '@mui/material';
import type { FormStepProps } from '../../interface';

export const AccountStep = ({ onChange, data }: FormStepProps) => {
  return (
    <>
      <TextField
        value={data.name}
        label="Nome"
        onChange={(e) => onChange('name', e.target.value)}
        required
      />
      <TextField
        type="email"
        name="email"
        value={data.email}
        onChange={(e) => onChange('email', e.target.value)}
        label="Email"
        required
      />
      <TextField
        type="password"
        value={data.password}
        name="password"
        label="Senha"
        onChange={(e) => onChange('password', e.target.value)}
        required
      />
      <TextField
        type="password"
        value={data.confirmPassword}
        name="confirmPassword"
        label="Confirmar Senha"
        onChange={(e) => onChange('confirmPassword', e.target.value)}
        required
      />
    </>
  );
};
