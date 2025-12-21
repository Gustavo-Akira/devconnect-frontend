import { render, fireEvent, act } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach, type Mock } from 'vitest';

vi.mock('../../../component/notification', () => {
  return {
    Notification: vi.fn(() => {
      return null;
    }),
  };
});

import { NotificationProvider, useNotification } from '../notificationContext';
import { Notification } from '../../../component/notification';

describe('NotificationContext', () => {
  beforeEach(() => {
    (Notification as Mock).mockClear?.();
  });

  it('shows notification with explicit type when showNotification is called', async () => {
    const Trigger = () => {
      const { showNotification } = useNotification();
      return (
        <button onClick={() => showNotification('ok', 'success')}>
          trigger
        </button>
      );
    };

    const { getByText } = render(
      <NotificationProvider>
        <Trigger />
      </NotificationProvider>,
    );

    await act(async () => {
      fireEvent.click(getByText('trigger'));
    });

    expect((Notification as Mock).mock.calls.length).toBeGreaterThanOrEqual(1);
    const props = (Notification as Mock).mock.calls[0][0];
    expect(props.message).toBe('ok');
    expect(props.type).toBe('success');
    expect(props.open).toBe(true);
    expect(typeof props.onClose).toBe('function');
  });

  it('uses default type "info" when type is not provided', async () => {
    const TriggerDefault = () => {
      const { showNotification } = useNotification();
      return (
        <button onClick={() => showNotification('hello')}>
          trigger-default
        </button>
      );
    };

    const { getByText } = render(
      <NotificationProvider>
        <TriggerDefault />
      </NotificationProvider>,
    );

    await act(async () => {
      fireEvent.click(getByText('trigger-default'));
    });

    const props = (Notification as Mock).mock.calls[0][0];
    expect(props.message).toBe('hello');
    expect(props.type).toBe('info');
  });

  it('onClose clears the notification', async () => {
    const Trigger = () => {
      const { showNotification } = useNotification();
      return (
        <button onClick={() => showNotification('to-close')}>
          trigger-close
        </button>
      );
    };

    const { getByText } = render(
      <NotificationProvider>
        <Trigger />
      </NotificationProvider>,
    );

    await act(async () => {
      fireEvent.click(getByText('trigger-close'));
    });

    expect((Notification as Mock).mock.calls.length).toBeGreaterThanOrEqual(1);
    const props = (Notification as Mock).mock.calls[0][0];

    await act(async () => {
      props.onClose();
    });

    expect((Notification as Mock).mock.calls.length).toBe(1);
  });

  it('throws when useNotification is used outside of NotificationProvider', () => {
    const Bad = () => {
      useNotification();
      return null;
    };

    expect(() => render(<Bad />)).toThrow(
      'useNotification must be used within a NotificationProvider',
    );
  });
});
