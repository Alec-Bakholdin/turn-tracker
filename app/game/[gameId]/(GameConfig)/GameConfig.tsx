import React from "react";
import PlayerOrder from "app/game/[gameId]/(GameConfig)/(PlayerOrder)/PlayerOrder";
import { Game } from "types/Game";
import { Grid } from "@mui/material";
import UsernameEditor from "app/game/[gameId]/(GameConfig)/UsernameEditor";
import { useUser } from "hooks/useUser";

export default function GameConfig({
  game,
}: {
  game: Game;
}): React.ReactElement {
  const user = useUser();
  const uid = user!.uid;
  const player = game.playerMap[uid];

  return (
    <>
      <Grid container>
        <Grid item>
          <UsernameEditor game={game} player={player} />
        </Grid>
        <Grid item xs={12}>
          <PlayerOrder game={game} />
        </Grid>
      </Grid>
    </>
  );
}
