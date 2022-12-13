"use client";

import React, { useState } from "react";
import { Player } from "types/Player";
import { TextField, Typography } from "@mui/material";
import { Game } from "types/Game";

export default function UsernameEditor({
  game,
  player,
}: {
  game: Game;
  player: Player;
}): React.ReactElement {
  const [newUsername, setNewUsername] = useState<string | null>(null);

  return (
    <>
      {newUsername ? (
        <TextField label={"Username"} />
      ) : (
        <Typography variant={"h6"}>{player.username}</Typography>
      )}
    </>
  );
}
