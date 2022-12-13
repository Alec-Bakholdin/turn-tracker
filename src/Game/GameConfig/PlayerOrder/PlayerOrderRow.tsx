import React from "react";
import { Avatar, Box, Stack, Typography, useTheme } from "@mui/material";
import { useSortable } from "@dnd-kit/sortable";
import { Player } from "../../../types/player";
import { CSS } from "@dnd-kit/utilities";
import { SupervisorAccount } from "@mui/icons-material";

export default function PlayerOrderRow({
  id,
  player,
  isSelf,
}: {
  player: Player;
  id: string;
  isSelf?: boolean;
}): React.ReactElement {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });
  const { palette } = useTheme();

  return (
    <Box
      ref={setNodeRef}
      sx={{ transform: CSS.Transform.toString(transform), transition }}
      {...attributes}
      {...listeners}
    >
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
    </Box>
  );
}
