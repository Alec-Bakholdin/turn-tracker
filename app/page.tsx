"use client";

import React from "react";
import { Button, Grid, Typography } from "@mui/material";
import { useUser } from "hooks/useUser";
import { ref, set } from "@firebase/database";
import { database } from "config/firebaseApp";
import { useRouter } from "next/navigation";
import { newGame } from "types/Game";

export default function Home(): React.ReactElement {
  const user = useUser();
  const router = useRouter();
  const handleCreateGame = async () => {
    if (!user) throw new Error("User is not logged in");
    const game = newGame(user.uid);
    await set(ref(database, `/game/${game.id}`), game);
    await router.push(`/game/${game.id}`);
  };

  return (
    <Grid container /*sx={{ marginTop: 10, marginBottom: 10 }}*/ spacing={4}>
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
