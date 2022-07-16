import { UserException } from './user-exception';
import { LOBBY_INVALID_UPDATE_EXCEPTION } from '@turn-tracker-nx-nestjs-react/turn-tracker-types';

export class InvalidUpdateException extends UserException {
  constructor(message: string) {
    super(LOBBY_INVALID_UPDATE_EXCEPTION, message);
  }
}
