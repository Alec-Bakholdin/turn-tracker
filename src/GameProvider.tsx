import React from "react";
import { Game, GameContext, gameRef, newGame } from "./types/game";
import { useObjectVal } from "react-firebase-hooks/database";
import { useUser } from "./types/user";
import { useSnackbar } from "notistack";
import { onDisconnect, set, update } from "firebase/database";
import { useNavigate, useSearchParams } from "react-router-dom";
import { newPlayer } from "./types/player";

export default function GameProvider({
  children,
}: {
  children?: React.ReactNode;
}): React.ReactElement {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const gameId = searchParams.get("gameId");
  const dbRef = gameId ? gameRef(gameId) : undefined;
  const [game] = useObjectVal<Game>(dbRef);

  const { user } = useUser();

  const raiseAlert = (message: string, e?: Error) => {
    console.error(message, e);
    enqueueSnackbar(message, { variant: "error" });
    throw new Error(message);
  };

  async function createGame() {
    if (!user) raiseAlert("Authentication failed");
    const g = newGame(user!.uid);
    set(gameRef(g.id), g)
      .then(() => navigate(`/game?gameId=${g.id}`))
      .catch((e) => raiseAlert("Failed to create game", e));
    return g.id;
  }

  async function updateGame(gameUpdate: Partial<Game>) {
    if (!game) raiseAlert("Not in a game");
    await update(dbRef!, gameUpdate);
  }

  async function joinGame() {
    if (!game || !gameId) raiseAlert("Game doesn't exist");
    if (!user) raiseAlert("Authentication failed");
    const playerMap = game!.playerMap;
    const playerObj = playerMap[user!.uid] || newPlayer(user!);
    const playerRef = gameRef(gameId!, "playerMap", user!.uid);
    if (!game!.playerOrder.includes(user!.uid)) {
      const playerOrder = [...game!.playerOrder, user!.uid];
      await updateGame({ playerOrder });
    }
    const username = user!.username;
    await set(playerRef, { ...playerObj, username, active: true }).then(() =>
      onDisconnect(playerRef).update({ active: false })
    );
  }

  return (
    <GameContext.Provider
      value={{
        createGame,
        updateGame,
        joinGame,
        game,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}
