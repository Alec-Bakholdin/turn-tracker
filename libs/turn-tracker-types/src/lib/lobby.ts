import { User } from './user';
import { Game, GameConfigDto, GameFactory, GameType, gameTypes } from './game';

export type LobbyStatus = 'setup' | 'inProgress';

export class LobbyDto {
  id?: string;
  users: { [id: string]: User } = {};
  userOrder: string[] = [];

  gameType: GameType = gameTypes[0];
  gameConfig: GameConfigDto = new GameConfigDto();
  activeUsers: Set<string> = new Set();
  waitingUsers: Set<string> = new Set();
}

export class Lobby extends LobbyDto {
  game: Game = GameFactory.getGame(gameTypes[0]);
  constructor(public override readonly id: string) {
    super();
    this.gameConfig = this.game.getDefaultConfig();
  }

  toDto(): LobbyDto {
    return Object.assign(new LobbyDto(), this);
  }

  override toString(): string {
    return `[${this.id}]`;
  }
}

export type UpdateLobbyAction = (updatedLobby: Partial<LobbyDto>) => void;

export const LOBBY_NOT_FOUND_EXCEPTION = 'LobbyNotFoundException';
export const LOBBY_INVALID_UPDATE_EXCEPTION = 'InvalidUpdateException';

export const LOBBY_UPDATE_EVENT = 'lobbyUpdateEvent';
export const LOBBY_START_GAME_EVENT = 'lobbyStartGame';
