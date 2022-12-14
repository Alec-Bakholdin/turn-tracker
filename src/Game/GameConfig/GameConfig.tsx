import React from "react";
import { Grid } from "@mui/material";
import { useGame } from "../../types/game";
import PlayerOrder from "./PlayerOrder/PlayerOrder";
import PhaseCreator from "./PhaseCreator/PhaseCreator";

export default function GameConfig(): React.ReactElement {
  const { game } = useGame();

  if (!game) {
    return <></>;
  }
  return (
    <Grid container justifyContent={"center"} spacing={2}>
      <Grid item>
        <PlayerOrder game={game} />
      </Grid>
      <Grid item>
        <PhaseCreator game={game} />
      </Grid>
    </Grid>
  );
}