import { ErrorDto } from '../error-dto';

export class UserException extends Error {
  constructor(public readonly type: string, public readonly text: string) {
    super(text);
  }

  toDto(): ErrorDto {
    return {
      type: this.type,
      message: this.message,
    } as ErrorDto;
  }
}
