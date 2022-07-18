import { Injectable, Logger } from '@nestjs/common';
import {
  GameFactory,
  Lobby,
  LobbyDto,
  User,
} from '@turn-tracker-nx-nestjs-react/turn-tracker-types';
import { randomInt } from 'crypto';
import { LobbyNotFoundException } from '../exceptions/lobby-not-found-exception';
import { InvalidUpdateException } from '../exceptions/invalid-update-exception';

@Injectable()
export class LobbyService {
  lobbyContainer: { [lobbyId: string]: Lobby } = {};

  // throws LobbyNotFoundException
  getLobby(lobbyId: string): Lobby {
    const lobby = this.lobbyContainer[lobbyId];
    if (!lobby) {
      throw new LobbyNotFoundException(lobbyId);
    }
    return lobby;
  }

  createLobby(): Lobby {
    const lobby = new Lobby(this.randomLobbyId());
    this.lobbyContainer[lobby.id] = lobby;
    Logger.log(`Created new lobby ${lobby}`);
    return lobby;
  }

  // returns true if the user was added, false if the user
  // was already there. Throws an exception if the lobby doesn't exist
  addUserToLobby(lobbyId: string, user: User) {
    const lobby = this.getLobby(lobbyId);
    if (lobby.users[user.id]) {
      Logger.log(`Player ${user} was already part of lobby ${lobby}`);
    }
    lobby.users[user.id] = user;
    if (!lobby.userOrder.includes(user.id)) {
      lobby.userOrder.push(user.id);
      Logger.log(`Added player ${user} to lobby ${lobby}`);
    }
  }

  removeUserFromLobby(lobbyId: string, user: User): Lobby {
    const lobby = this.getLobby(lobbyId);
    if (!lobby.users[user.id]) {
      return;
    }
    delete lobby.users[user.id];
    if (lobby.userOrder.includes(user.id)) {
      lobby.userOrder = lobby.userOrder.splice(
        lobby.userOrder.indexOf(user.id),
        1
      );
    }
  }

  removeLobby(lobbyId: string) {
    if (this.lobbyContainer[lobbyId]) {
      delete this.lobbyContainer[lobbyId];
    }
  }

  updateLobby(lobbyId: string, updatedLobby: Partial<LobbyDto>) {
    if (updatedLobby.id) {
      throw new InvalidUpdateException('Cannot update lobby id');
    }
    const lobby = this.getLobby(lobbyId);
    if (updatedLobby.gameType) {
      lobby.game = GameFactory.getGame(updatedLobby.gameType);
      updatedLobby.gameConfig = lobby.game.getDefaultConfig();
    }
    if (updatedLobby.gameConfig) {
      updatedLobby.gameConfig = lobby.game.updateConfig(
        lobby.gameConfig,
        updatedLobby.gameConfig
      );
    }
    Object.assign(lobby, updatedLobby);
    Logger.log(`Updating lobby ${lobby} with`, updatedLobby);
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
