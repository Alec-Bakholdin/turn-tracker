import { User } from "./user";

export interface Player {
  uid: string;
  active: boolean;
  username: string;
}

export function newPlayer(user: User): Player {
    return {
        uid: user.uid,
        username: user.username,
        active: true,
    };
}

export type PlayerMap = { [uid: string]: Player };
