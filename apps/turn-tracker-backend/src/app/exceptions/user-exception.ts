import { WsException } from '@nestjs/websockets';
import { ErrorDto } from '@turn-tracker-nx-nestjs-react/turn-tracker-types';

export class UserException extends WsException {
  constructor(public readonly type: string, public readonly message: string) {
    super(message);
  }

  toDto(): ErrorDto {
    return {
      type: this.type,
      message: this.message,
    } as ErrorDto;
  }
}
