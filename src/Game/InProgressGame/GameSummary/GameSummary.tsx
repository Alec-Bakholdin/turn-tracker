import React from "react";
import { Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";
import { Game } from "../../../types/game";
import "./GameSummary.scss";

export default function GameSummary({
  game,
}: {
  game: Game;
}): React.ReactElement {
  return (
    <Card
      sx={{
        width: {
          xs: 400,
          sm: 500,
          md: 600,
        },
      }}
    >
      <CardHeader title={"Game Summary"} />
      <CardContent>
        <Grid container>
          <Grid item>
            <Typography variant={"h6"}>Phase</Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
