import { GameConfigDto } from './game-config';
import { Lobby, LobbyDto } from '../lobby';

export abstract class Game {
  constructor(protected readonly lobby: Lobby) {}

  abstract getDefaultConfig(): GameConfigDto;

  start(): void {
    throw new Error('Start function for this game type not implemented yet');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  playerReady(userId: string): Partial<LobbyDto> {
    throw new Error('Player ready function not yet implemented');
  }

  updateConfig(configUpdate: Partial<GameConfigDto>): GameConfigDto {
    return Object.assign({ ...this.lobby.gameConfig }, { ...configUpdate });
  }
}
