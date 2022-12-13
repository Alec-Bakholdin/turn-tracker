import React from "react";
import { Player } from "types/Player";
import { Box } from "@mui/material";
import { useSortable } from "@dnd-kit/sortable";

export default function PlayerOrderRow({
  id,
  player,
}: {
  player: Player;
  id: string;
}): React.ReactElement {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  return (
    <Box
      width={"100%"}
      ref={setNodeRef}
      className={"player-row"}
      /*sx={{ transform: CSS.Transform.toString(transform), transition }}*/
      {...attributes}
      {...listeners}
    >
      {player.username}
    </Box>
  );
}
