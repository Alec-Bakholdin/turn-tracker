export interface Player {
    uid: string;
    active: boolean;
    username: string;
}

export type PlayerMap = { [uid: string]: Player };
