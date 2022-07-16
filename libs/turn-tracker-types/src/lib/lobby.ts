import { UserDto } from './user-dto';

export type LobbyStatus = 'setup' | 'inProgress';
export const gameTypes: GameType[] = [
  'Turn Based',
  'Phase Based',
  'Seven Wonders',
];
export type GameType = 'Turn Based' | 'Phase Based' | 'Seven Wonders';
//| 'Sidereal Confluence'
//| 'Nemesis'
//| 'Turn Based'
//| 'Phase Based';

export class LobbyDto {
  id?: string;
  users: { [id: string]: UserDto } = {};
  gameType: GameType = gameTypes[0]; // the type of game that will be played
  turnOrder: string[] = []; // list of user ids in turn order
  currentUser?: string; // id of the user whose turn it is
  status: LobbyStatus = 'setup'; // determines if in game or not
}

export class Lobby extends LobbyDto {
  constructor(public override readonly id: string) {
    super();
  }

  toDto(): LobbyDto {
    return Object.assign(new LobbyDto(), this);
  }
}

export const LOBBY_NOT_FOUND_EXCEPTION = 'LobbyNotFoundException';
export const LOBBY_INVALID_UPDATE_EXCEPTION = 'InvalidUpdateException';
export const LOBBY_UPDATE_EVENT = 'lobbyUpdateEvent';
