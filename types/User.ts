export interface UserData {
  username?: string;
  gameId?: string;
}

export type User = UserData & { uid: string };
