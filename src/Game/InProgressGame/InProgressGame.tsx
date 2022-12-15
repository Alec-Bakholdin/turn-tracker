import React, { useEffect } from "react";
import PlayerOrder from "../PlayerOrder/PlayerOrder";
import { useGame } from "../../types/game";
import ActionArea from "./ActionArea/ActionArea";
import { Stack } from "@mui/material";
import { useUser } from "../../types/user";

export default function InProgressGame(): React.ReactElement {
  const { game, updateGame } = useGame();
  const { user } = useUser();
  useEffect(() => {
    // only leader advances the game
    if (!game?.leaderId || user?.uid !== game.leaderId) return;

    const readyPlayers = game?.readyPlayers || [];
    const activePlayers = game?.activePlayers || [];

    // once all active players are ready, advance phase
    if (
      activePlayers.filter((uid) => !readyPlayers.includes(uid)).length === 0
    ) {
      const phaseOrder = game!.phaseOrder!;
      const phaseMap = game!.phaseMap!;
      const activePhase = game!.activePhase!;
      const playerOrder = game!.playerOrder!;

      const phase = phaseMap[activePhase];
      const phaseIndex = phaseOrder.indexOf(activePhase);
      const phaseIsOver =
        phase.simultaneous ||
        activePlayers[0] === playerOrder[playerOrder.length - 1];
      const nextPhaseIndex = (phaseIndex + 1) % phaseOrder.length;
      let newPhase, newActivePlayers;

      if (phaseIsOver) {
        newPhase = phaseMap[phaseOrder[nextPhaseIndex]];
        newActivePlayers = newPhase.simultaneous
          ? [...playerOrder]
          : [playerOrder[0]];
      } else {
        newPhase = phase;
        const activePlayerIndex = playerOrder.indexOf(activePlayers[0]);
        const nextPlayerIndex = (activePlayerIndex + 1) % playerOrder.length;
        newActivePlayers = [playerOrder[nextPlayerIndex]];
      }

      updateGame({
        readyPlayers: [],
        activePlayers: newActivePlayers,
        activePhase: newPhase.id,
      });
    }
  }, [game?.readyPlayers]);

  return (
    <Stack spacing={2} alignItems={"center"}>
      {/*<GameSummary game={game!}/>*/}
      <ActionArea game={game!} />
      <PlayerOrder game={game!} />
    </Stack>
  );
}
