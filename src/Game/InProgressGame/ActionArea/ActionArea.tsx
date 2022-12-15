import React from "react";
import { Card, CardContent, CardHeader, Grid, IconButton } from "@mui/material";
import { Game, useGame } from "../../../types/game";
import "./ActionArea.scss";
import { CancelOutlined, CheckCircleOutline } from "@mui/icons-material";
import { useUser } from "../../../types/user";

export default function ActionArea({
  game,
}: {
  game: Game;
}): React.ReactElement {
  const { user } = useUser();
  const { updateGame } = useGame();
  const activePlayers = game.activePlayers || [];
  const readyPlayers = game.readyPlayers || [];
  const isActive = activePlayers.includes(user?.uid || "");
  const isReady = readyPlayers.includes(user?.uid || "");
  const handleReady = () =>
    updateGame({ readyPlayers: [...readyPlayers, user!.uid] });
  const handleUnready = () =>
    updateGame({
      readyPlayers: readyPlayers.filter((uid) => uid !== user!.uid),
    });

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
      <CardHeader title={"Available Actions"} />
      <CardContent sx={{ height: 400 }}>
        <Grid container className={"action-container"}>
          {isActive && !isReady && (
            <Grid item>
              <IconButton onClick={handleReady}>
                <CheckCircleOutline />
              </IconButton>
            </Grid>
          )}
          {isActive && isReady && (
            <Grid item>
              <IconButton onClick={handleUnready}>
                <CancelOutlined />
              </IconButton>
            </Grid>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
}
