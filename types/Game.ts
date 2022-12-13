import { randomString } from "util/randomString";
import { PlayerMap } from "types/Player";
import React, { useContext } from "react";
import { DatabaseReference, ref } from "@firebase/database";
import { database } from "config/firebaseApp";

export interface Game {
  id: string;
  leaderId: string;
  playerOrder: string[];
  playerMap: PlayerMap;
  status: "config" | "inProgress" | "done";
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

export const GameContext = React.createContext<Game | null>(null);
export function useGame() {
  return useContext(GameContext);
}

/**
 * Gets a {@link DatabaseReference} to the game object, or a nested path
 * @param game - the game to get a ref to
 * @param path - a list of path parts (optional)
 */
export function gameRef(game: Game, ...path: string[]): DatabaseReference {
  const computedPath = path.length > 0 ? "/" + path.join("/") : "";
  console.log(computedPath);
  return ref(database, `/game/${game.id}${computedPath}`);
}
