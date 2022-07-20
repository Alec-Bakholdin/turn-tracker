import { User } from './user';
import { Game, GameConfigDto, GameType } from './game';

export type LobbyStatus = 'setup' | 'inProgress';

export class LobbyDto {
  id?: string;
  users: { [id: string]: User } = {};
  userOrder: string[] = [];
  status: LobbyStatus = 'setup';

  gameType: GameType = 'Turn Based';
  gameConfig: GameConfigDto = new GameConfigDto();

  turn = 0;
  activeUserIndex = 0; // used only in games where one person goes at a time
  activeUsers: string[] = [];
  waitingUsers: string[] = [];
}

export class Lobby extends LobbyDto {
  activeUserSet: Set<string> = new Set();
  waitingUserSet: Set<string> = new Set();
  game?: Game;

  constructor(public override readonly id: string) {
    super();
  }

  toDto(): LobbyDto {
    const lobbyDto = Object.assign(new LobbyDto(), {
      ...this,
      game: null,
      activeUsers: Array.from(this.activeUserSet),
      waitingUsers: Array.from(this.waitingUserSet),
    });
    delete lobbyDto['game'];
    delete lobbyDto['activeUserSet'];
    delete lobbyDto['waitingUserSet'];
    return lobbyDto as LobbyDto;
  }

  override toString(): string {
    return `[${this.id}]`;
  }
}

export type UpdateLobbyAction = (updatedLobby: Partial<LobbyDto>) => void;

export const LOBBY_NOT_FOUND_EXCEPTION = 'LobbyNotFoundException';
export const LOBBY_INVALID_UPDATE_EXCEPTION = 'InvalidUpdateException';
export const USER_NOT_FOUND_EXCEPTION = 'UserNotFoundException';
export const NOT_YOUR_TURN_EXCEPTION = 'NotYourTurnException';

export const LOBBY_UPDATE_EVENT = 'lobbyUpdateEvent';
export const LOBBY_START_GAME_EVENT = 'lobbyStartGame';
export const LOBBY_PLAYER_READY_EVENT = 'lobbyPlayerReady';
