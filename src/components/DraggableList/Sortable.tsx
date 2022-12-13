import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { Box } from "@mui/material";
import { CSS } from "@dnd-kit/utilities";

export default function Sortable({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}): React.ReactElement {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  return (
    <Box
      ref={setNodeRef}
      sx={{ transform: CSS.Transform.toString(transform), transition }}
      {...attributes}
      {...listeners}
    >
      {children}
    </Box>
  );
}
