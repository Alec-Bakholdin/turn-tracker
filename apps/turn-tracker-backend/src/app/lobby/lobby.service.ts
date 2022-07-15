import { Injectable } from '@nestjs/common';
import {
  LobbyDto,
  UserDto,
} from '@turn-tracker-nx-nestjs-react/turn-tracker-types';
import { randomInt } from 'crypto';
import UserException from '../exceptions/UserException';

@Injectable()
export class LobbyService {
  lobbyContainer: { [lobbyId: string]: LobbyDto } = {};

  getLobby(lobbyId: string): LobbyDto | undefined {
    return this.lobbyContainer[lobbyId];
  }

  createLobby(): LobbyDto {
    return new LobbyDto();
  }

  // returns true if the user was added, false if the user
  // was already there. Throws an exception if the lobby doesn't exist
  addUserToLobby(lobbyId: string, user: UserDto): boolean {
    const lobby = this.getLobby(lobbyId);
    if (!lobby) {
      throw new UserException('Lobby does not exist');
    }
    if (lobby.users[user.id]) {
      return false;
    }
    lobby.users[user.id] = user;
    return true;
  }

  private randomLobbyId(): string {
    const randStrChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const randStrLen = 5;
    let randStr: string;
    do {
      randStr = '';
      for (let i = 0; i < randStrLen; i++) {
        randStr += randStrChars.charAt(randomInt(0, 25));
      }
    } while (this.lobbyContainer[randStr]);
    return randStr;
  }
}
