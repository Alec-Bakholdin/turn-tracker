import { Injectable, Logger } from '@nestjs/common';
import {
  Lobby,
  UserDto,
} from '@turn-tracker-nx-nestjs-react/turn-tracker-types';
import { randomInt } from 'crypto';
import { LobbyNotFoundException } from '../exceptions/lobby-not-found-exception';

@Injectable()
export class LobbyService {
  lobbyContainer: { [lobbyId: string]: Lobby } = {};

  getLobby(lobbyId: string): Lobby | undefined {
    return this.lobbyContainer[lobbyId];
  }

  createLobby(user: UserDto): Lobby {
    const lobby = new Lobby(this.randomLobbyId());
    this.lobbyContainer[lobby.id] = lobby;
    Logger.log(`Created new lobby ${lobby.id}`);
    this.addUserToLobby(lobby.id, user);
    return lobby;
  }

  // returns true if the user was added, false if the user
  // was already there. Throws an exception if the lobby doesn't exist
  addUserToLobby(lobbyId: string, user: UserDto): boolean {
    const lobby = this.getLobby(lobbyId);
    if (!lobby) {
      throw new LobbyNotFoundException(lobbyId);
    }
    if (lobby.users[user.id]) {
      Logger.log(
        `Player [${
          user.name ?? user.id
        }] was already part of lobby [${lobbyId}]`
      );
      return false;
    }
    lobby.users[user.id] = user;
    lobby.turnOrder.push(user.id);
    Logger.log(`Added player [${user.name ?? user.id}] to lobby [${lobbyId}]`);
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
