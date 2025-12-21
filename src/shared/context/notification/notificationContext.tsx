import { createContext, useState, useContext, useCallback } from 'react';
import { Notification } from '../../component/notification';

interface NotificationContextValue {
  showNotification: (message: string, type?: NotificationType) => void;
  notification?: { message: string; type: NotificationType } | null;
}
export type NotificationType = 'info' | 'success' | 'error' | 'warning';
/* eslint-disable react-refresh/only-export-components */

const NotificationContext = createContext<NotificationContextValue | undefined>(
  undefined,
);

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [notification, setNotification] = useState<{
    message: string;
    type: NotificationType;
  } | null>(null);

  const showNotification = useCallback(
    (message: string, type: NotificationType = 'info') => {
      setNotification({ message, type });
    },
    [],
  );

  return (
    <NotificationContext.Provider value={{ showNotification, notification }}>
      {children}
      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          open={notification !== null}
          onClose={() => setNotification(null)}
        />
      )}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const ctx = useContext(NotificationContext);
  if (!ctx) {
    throw new Error(
      'useNotification must be used within a NotificationProvider',
    );
  }
  return ctx;
};
