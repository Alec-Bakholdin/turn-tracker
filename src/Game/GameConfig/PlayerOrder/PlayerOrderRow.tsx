import React from "react";
import { Avatar, Stack, Typography, useTheme } from "@mui/material";
import { Player } from "../../../types/player";
import { SupervisorAccount } from "@mui/icons-material";

export default function PlayerOrderRow({
  player,
  isSelf,
}: {
  player: Player;
  isSelf?: boolean;
}): React.ReactElement {
  const { palette } = useTheme();

  return (
    <Stack
      direction={"row"}
      className={"player-row"}
      flexWrap={"nowrap"}
      alignItems={"center"}
      bgcolor={"background.default"}
      sx={{ borderColor: palette.primary.main }}
    >
      <Avatar />
      <Typography component={"span"} textOverflow={"ellipsis"}>
        {player?.username}
      </Typography>
      {isSelf && <SupervisorAccount />}
    </Stack>
  );
}
