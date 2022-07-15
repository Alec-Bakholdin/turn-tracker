export type ErrorType = 'user' | 'lobby';

export interface ErrorDto {
  type: ErrorType;
  message: string;
}

export const ERROR_EVENT_TYPE = 'error';
