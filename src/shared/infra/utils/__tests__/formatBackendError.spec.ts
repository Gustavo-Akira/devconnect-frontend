import type { AxiosError } from 'axios';
import { describe, it, expect } from 'vitest';
import { formatBackendError } from '../formatBackendError';

describe('formatBackendError', () => {
  it('should format errorDetailList with field and message', () => {
    const error = {
      response: {
        data: {
          errorDetailList: [
            { field: 'email', message: 'invalid' },
            { field: 'password', message: 'too short' },
          ],
        },
      },
    } as AxiosError;

    const result = formatBackendError(error);

    expect(result).toBe('email: invalid; password: too short');
  });

  it('should format errorDetailList without field', () => {
    const error = {
      response: {
        data: {
          errorDetailList: [{ message: 'Something went wrong' }],
        },
      },
    } as AxiosError;

    const result = formatBackendError(error);

    expect(result).toBe('Something went wrong');
  });

  it('should ignore empty messages in errorDetailList', () => {
    const error = {
      response: {
        data: {
          errorDetailList: [
            { field: 'email', message: '' },
            { message: undefined },
          ],
        },
      },
    } as AxiosError;

    const result = formatBackendError(error);

    expect(result).toBe('');
  });

  it('should return message when errorDetailList is empty', () => {
    const error = {
      response: {
        data: {
          errorDetailList: [],
          message: 'Invalid request',
        },
      },
    } as AxiosError;

    const result = formatBackendError(error);

    expect(result).toBe('Invalid request');
  });

  it('should return message when present and valid', () => {
    const error = {
      response: {
        data: {
          message: 'Unauthorized',
        },
      },
    } as AxiosError;

    const result = formatBackendError(error);

    expect(result).toBe('Unauthorized');
  });

  it('should return code when message is missing', () => {
    const error = {
      response: {
        data: {
          code: 'AUTH_401',
        },
      },
    } as AxiosError;

    const result = formatBackendError(error);

    expect(result).toBe('code: AUTH_401');
  });

  it('should return error.message when no backend data exists', () => {
    const error = new Error('Network Error');

    const result = formatBackendError(error);

    expect(result).toBe('Network Error');
  });

  it('should return stringified error when message does not exist', () => {
    const error = 12345;

    const result = formatBackendError(error);

    expect(result).toBe('12345');
  });

  it('should handle undefined error gracefully', () => {
    const result = formatBackendError(undefined);

    expect(result).toBe('undefined');
  });
});
