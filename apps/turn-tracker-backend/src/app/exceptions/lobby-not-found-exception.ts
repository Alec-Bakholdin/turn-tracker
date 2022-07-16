import { UserException } from './user-exception';
import { LOBBY_NOT_FOUND_EXCEPTION } from '@turn-tracker-nx-nestjs-react/turn-tracker-types';

export class LobbyNotFoundException extends UserException {
  constructor(lobbyId: string) {
    const message = `Lobby [${lobbyId}] does not exist`;
    super(LOBBY_NOT_FOUND_EXCEPTION, message);
  }
}
