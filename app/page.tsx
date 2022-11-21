"use client";

import React, { useEffect } from "react";
import { Button, Grid, Typography } from "@mui/material";
import { useUser } from "hooks/useUser";
import { useRouter } from "next/navigation";
import { useGame } from "hooks/useGame";

export default function App(): React.ReactElement {
  const { user } = useUser();
  const router = useRouter();
  useEffect(() => {
    if (user?.gameId) {
      router.push(`/game/${user.gameId}`);
    }
  }, [user?.gameId]);
  const { createGame } = useGame();
  const handleCreateGame = async () => {
    await createGame();
  };

  return (
    <Grid container sx={{ marginTop: 10, marginBottom: 10 }} spacing={4}>
      <Grid item xs={12}>
        <Typography variant={"h2"} textAlign={"center"}>
          Whose Turn is it Anyways?
        </Typography>
      </Grid>
      <Grid item xs={12} container justifyContent={"center"}>
        <Button onClick={handleCreateGame}>Create Game</Button>
      </Grid>
      <Grid item></Grid>
    </Grid>
  );
}
