import { Alert, Snackbar } from '@mui/material';

export type NotificationType = 'success' | 'error' | 'warning';

export const Notification = ({
  message,
  type,
  open,
}: {
  message: string;
  type: NotificationType;
  open: boolean;
}) => {
  return (
    <Snackbar open={open} autoHideDuration={6000}>
      <Alert severity={type} sx={{ width: '100%' }}>
        {message}
      </Alert>
    </Snackbar>
  );
};
