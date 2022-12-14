import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { Box, IconButton } from "@mui/material";
import { CSS } from "@dnd-kit/utilities";
import { Menu } from "@mui/icons-material";

export default function Sortable({
  id,
  children,
  useHandle,
}: {
  id: string;
  children: React.ReactNode;
  useHandle?: boolean;
}): React.ReactElement {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const draggableAttributes = { ...attributes, ...listeners };

  return (
    <Box
      className={"draggable-container"}
      ref={setNodeRef}
      sx={[
        { transform: CSS.Transform.toString(transform), transition },
        useHandle ? {} : { cursor: "grab" },
      ]}
      {...(useHandle ? {} : draggableAttributes)}
    >
      {children}
      {useHandle && (
        <Box className={"drag-handle"} {...draggableAttributes}>
          <IconButton className={"drag-handle-button"}>
            <Menu />
          </IconButton>
        </Box>
      )}
    </Box>
  );
}
