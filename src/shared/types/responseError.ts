export type ErrorDetail = {
  field?: string;
  message: string;
};

export type ErrorResponse = {
  timestamp?: string;
  status?: number;
  error?: string;
  message?: string;
  path?: string;
  code?: string;
  errorDetailList?: ErrorDetail[];
};
