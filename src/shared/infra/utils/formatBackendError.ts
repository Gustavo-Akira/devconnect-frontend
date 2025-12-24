import type { AxiosError } from 'axios';
import type { ErrorResponse } from '../../types/responseError';

export const formatBackendError = (err: unknown) => {
  const axiosErr = err as AxiosError | undefined;
  const data = axiosErr?.response?.data as ErrorResponse | undefined;

  if (data) {
    if (Array.isArray(data.errorDetailList)) {
      const details = data.errorDetailList
        .map((d) => {
          if (!d?.message) return null;
          return d.field ? `${d.field}: ${d.message}` : d.message;
        })
        .filter(Boolean)
        .join('; ');

      if (details) return details;
    }

    if (typeof data.message === 'string' && data.message) {
      return data.message;
    }

    if (typeof data.code === 'string' && data.code) {
      return `code: ${data.code}`;
    }

    return '';
  }

  return (err as Error)?.message || String(err);
};
