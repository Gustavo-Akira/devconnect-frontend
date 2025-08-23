import { TextField } from '@mui/material';
import type { FormStepProps } from '../../interface';

export const DevInfoStep = ({ onChange, data }: FormStepProps) => {
  return (
    <>
      <TextField
        value={data.githubLink}
        label="Link do Github"
        onChange={(e) => onChange('githubLink', e.target.value)}
        required
      />
      <TextField
        value={data.linkedinLink}
        label="Link do Linkedin"
        onChange={(e) => onChange('linkedinLink', e.target.value)}
        required
      />
      <TextField
        value={data.bio}
        label="Bio"
        onChange={(e) => onChange('bio', e.target.value)}
        required
      />
      <TextField
        value={data.stack.join(', ')}
        label="Stack"
        onChange={(e) =>
          onChange(
            'stack',
            e.target.value.split(',').map((item) => item.trim()),
          )
        }
        required
      />
    </>
  );
};
