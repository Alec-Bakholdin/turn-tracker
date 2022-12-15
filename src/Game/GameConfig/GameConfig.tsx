import React from "react";
import { Button, Grid } from "@mui/material";
import { useGame } from "../../types/game";
import PlayerOrder from "../PlayerOrder/PlayerOrder";
import PhaseCreator from "./PhaseCreator/PhaseCreator";
import { useSnackbar } from "notistack";

export default function GameConfig(): React.ReactElement {
  const { game, updateGame } = useGame();
  const { enqueueSnackbar } = useSnackbar();
  const handleStart = () => {
    if (!game?.phaseOrder?.length) {
      enqueueSnackbar("Please add a phase", { variant: "error" });
      throw new Error("Please add a phase");
    }
    const phase = (game.phaseMap || {})[game.phaseOrder[0]];
    const activePlayers = phase.simultaneous
      ? [...game.playerOrder]
      : [game.playerOrder[0]];
    return updateGame({
      status: "inProgress",
      activePlayers,
      activePhase: phase.id,
    });
  };

  if (!game) {
    return <></>;
  }
  return (
    <Grid container justifyContent={"center"} spacing={2}>
      <Grid item xs={12}></Grid>
      <Grid item>
        <PlayerOrder game={game} draggable />
      </Grid>
      <Grid item>
        <PhaseCreator game={game} />
      </Grid>
      <Grid item xs={12} container justifyContent={"center"}>
        <Grid item sx={{ width: 600 }}>
          <Button fullWidth variant={"outlined"} onClick={handleStart}>
            START
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
}
