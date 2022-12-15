import { randomString } from "../util";
import { PlayerMap } from "./player";
import React, { useContext } from "react";
import { DatabaseReference, ref } from "firebase/database";
import { db } from "../firebaseApp";
import { PhaseMap } from "./phase";

export interface Game {
  id: string;
  leaderId: string;
  activePhase?: string;
  activePlayers?: string[];
  readyPlayers?: string[];
  playerOrder: string[];
  playerMap: PlayerMap;
  status: "config" | "inProgress" | "done";
  phaseOrder?: string[];
  phaseMap?: PhaseMap;
}

export function newGame(uid: string): Game {
    return {
        id: randomString(6),
        leaderId: uid,
        playerOrder: [uid],
        playerMap: { [uid]: { uid, active: false, username: uid } },
        status: "config",
    };
}

export interface GameActions {
    game?: Game;
    createGame: () => Promise<string>; // returns the gameId of the created game
    updateGame: (update: Partial<Game>) => Promise<void>;
    joinGame: () => void;
}

export const GameContext = React.createContext<GameActions>({
    createGame: async () => "",
    updateGame: async (_) => {},
    joinGame: () => {}
})

export function useGame() {
  return useContext(GameContext);
}

/**
 * Gets a {@link DatabaseReference} to the game object, or a nested path
 * @param gameId - the id of the game to get a ref to
 * @param path - a list of path parts (optional)
 */
export function gameRef(gameId: string, ...path: string[]): DatabaseReference {
    const computedPath = path.length > 0 ? "/" + path.join("/") : "";
    return ref(db, `/game/${gameId}${computedPath}`);
}

