"use client";

import React from "react";
import { useGame } from "types/Game";
import CenteredLoadingIndicator from "components/CenteredLoadingIndicator";
import GameConfig from "app/game/[gameId]/(GameConfig)/GameConfig";

export default function GameComponent(): React.ReactElement {
  const game = useGame();
  return (
    <>
      {!game && <CenteredLoadingIndicator />}
      {game?.status === "config" && <GameConfig game={game} />}
    </>
  );
}
