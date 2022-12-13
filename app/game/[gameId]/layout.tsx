"use client";

import React, { useEffect } from "react";
import { useObject } from "react-firebase-hooks/database";
import { onDisconnect, ref, set, update } from "@firebase/database";
import { database } from "config/firebaseApp";
import { useCookies } from "react-cookie";
import { useUser } from "hooks/useUser";
import { Player } from "types/Player";
import { Game, GameContext, gameRef } from "types/Game";

export default function GameLayout({
  children,
  params: { gameId },
}: {
  children: React.ReactElement;
  params: { gameId: string };
}): React.ReactElement {
  const [game] = useObject(ref(database, `/game/${gameId}`));
  const [{ username }] = useCookies(["username"]);
  const user = useUser();

  useEffect(() => {
    const gameObj = game?.val() as Game;
    if (game && gameObj && user && !gameObj.playerMap[user.uid]?.active) {
      const { uid } = user;
      const playerRef = gameRef(gameObj, "playerMap", uid);
      const playerOrder = gameObj.playerOrder.includes(uid)
        ? gameObj.playerOrder
        : [...gameObj.playerOrder, uid];
      set(playerRef, { username, uid, active: true } as Player)
        .then(() => onDisconnect(playerRef).update({ active: false }))
        .then(() => update(game.ref, { playerOrder }))
        .catch(console.error);
    }
  }, [game, user]);

  const gameObj = game?.val();
  return (
    <GameContext.Provider value={gameObj}>{children}</GameContext.Provider>
  );
}
