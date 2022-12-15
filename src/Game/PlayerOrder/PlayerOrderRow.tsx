import React from "react";
import { Avatar, Box, Stack, Typography, useTheme } from "@mui/material";
import { Player } from "../../types/player";
import { SupervisorAccount } from "@mui/icons-material";
import ThinkingIndicator from "./ThinkingIndicator";

export default function PlayerOrderRow({
  player,
  isSelf,
  isActive,
}: {
  player: Player;
  isSelf?: boolean;
  isActive?: boolean;
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
      {isActive && (
        <Box flexGrow={1} display={"flex"} justifyContent={"end"}>
          <ThinkingIndicator />
        </Box>
      )}
    </Stack>
  );
}
