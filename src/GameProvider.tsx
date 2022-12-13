import React, { useState } from "react";
import { Game, GameActions, GameContext, gameRef, newGame } from "./types/game";
import { useObjectVal } from "react-firebase-hooks/database";
import { useUser } from "./types/user";
import { useSnackbar } from "notistack";
import { set, update } from "firebase/database";

export default function GameProvider({
  children,
}: {
  children?: React.ReactNode;
}): React.ReactElement {
  const { user } = useUser();
  const [gameId, setGameId] = useState<string | undefined>();
  const dbRef = gameId ? gameRef(gameId) : undefined;
  const [game] = useObjectVal<Game>(dbRef);
  const { enqueueSnackbar } = useSnackbar();
  const raiseAlert = (message: string, e?: Error) => {
    console.error(message, e);
    enqueueSnackbar(message, { variant: "error" });
    throw new Error(message);
  };

  const gameActions: GameActions = {
    createGame: async () => {
      if (user) raiseAlert("Authentication failed");
      const g = newGame(user!.uid);
      setGameId(g.id);
      set(gameRef(g.id), g).catch((e) =>
        raiseAlert("Failed to create game", e)
      );
      return g.id;
    },
    updateGame: async (gameUpdate: Partial<Game>) => {
      if (!game) raiseAlert("Not in a game");
      await update(dbRef!, gameUpdate);
    },
    joinGame: (gameId: string) => setGameId(gameId),
    game,
  };
  return (
    <GameContext.Provider value={gameActions}>{children}</GameContext.Provider>
  );
}
