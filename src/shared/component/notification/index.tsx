import { Alert, Snackbar } from '@mui/material';
import type { NotificationType } from '../../context/notification/notificationContext';

export const Notification = ({
  message,
  type,
  open,
  onClose,
}: {
  message: string;
  type: NotificationType;
  open: boolean;
  onClose: () => void;
}) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
      <Alert severity={type} sx={{ width: '100%' }} onClose={onClose}>
        {message}
      </Alert>
    </Snackbar>
  );
};
