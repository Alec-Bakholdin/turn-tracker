export type ErrorType = 'user' | 'lobby';

export interface ErrorDto {
  type: string;
  message: string;
}

export const ERROR_EVENT_TYPE = 'error';
