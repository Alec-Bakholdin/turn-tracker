import React, { useEffect } from "react";
import { useGame } from "../types/game";
import { useUser } from "../types/user";
import GameConfig from "./GameConfig/GameConfig";

export default function Game(): React.ReactElement {
  const { game, joinGame } = useGame();
  const { user } = useUser();
  useEffect(() => {
    if (game && user && !game.playerMap[user.uid]?.active) {
      joinGame();
    }
  }, [game, user]);

  return <>{game?.status === "config" && <GameConfig />}</>;
}