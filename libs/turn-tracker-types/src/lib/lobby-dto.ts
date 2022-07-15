import { UserDto } from './user-dto';

export type LobbyStatus = 'setup' | 'inProgress';
export type GameType = 'Turn Based';
//| 'Sidereal Confluence'
//| 'Nemesis'
//| 'Turn Based'
//| 'Phase Based';

export class LobbyDto {
  users: { [id: string]: UserDto } = {};
  gameType?: GameType; // the type of game that will be played
  turnOrder: string[] = []; // list of user ids in turn order
  currentUser?: string; // id of the user whose turn it is
  status: LobbyStatus = 'setup'; // determines if in game or not
}

export const LOBBY_UPDATE_EVENT = 'lobbyUpdate';
