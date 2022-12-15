import React, { useEffect, useState } from "react";
import { Game, GameContext, gameRef, newGame } from "./types/game";
import { useObjectVal } from "react-firebase-hooks/database";
import { useUser } from "./types/user";
import { SnackbarKey, useSnackbar } from "notistack";
import { onDisconnect, set, update } from "firebase/database";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { newPlayer } from "./types/player";
import { Button, IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

export default function GameProvider({
  children,
}: {
  children?: React.ReactNode;
}): React.ReactElement {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const gameId = searchParams.get("gameId");
  const dbRef = gameId ? gameRef(gameId) : undefined;
  const [game] = useObjectVal<Game>(dbRef);

  const [gameReminderKey, setGameReminderKey] = useState<
    SnackbarKey | undefined
  >();
  const handleNavigate = () => {
    navigate(`/game?gameId=${gameId}`);
  };
  useEffect(() => {
    if (!location.pathname.endsWith("/game") && game && !gameReminderKey) {
      const key = enqueueSnackbar("It looks like you're in a game", {
        autoHideDuration: null,
        action: (key) => (
          <>
            <Button onClick={handleNavigate}>Return to Game</Button>
            <IconButton onClick={() => closeSnackbar(key)} color={"primary"}>
              <Close />
            </IconButton>
          </>
        ),
      });
      setGameReminderKey(key);
    } else if (location.pathname.endsWith("/game") && gameReminderKey) {
      closeSnackbar(gameReminderKey);
      setGameReminderKey(undefined);
    }
  }, [location]);

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
