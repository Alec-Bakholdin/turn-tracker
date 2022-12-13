import React from "react";
import { Grid } from "@mui/material";
import { useGame } from "../../types/game";
import PlayerOrder from "./PlayerOrder/PlayerOrder";

export default function GameConfig(): React.ReactElement {
  const { game } = useGame();

  if (!game) {
    return <></>;
  }
  return (
    <Grid container justifyContent={"center"}>
      <Grid item>
        <PlayerOrder game={game} />
      </Grid>
    </Grid>
  );
}