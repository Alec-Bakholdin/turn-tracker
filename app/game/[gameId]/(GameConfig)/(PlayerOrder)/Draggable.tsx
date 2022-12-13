"use client";

import React from "react";
import { useDraggable } from "@dnd-kit/core";

export default function Draggable({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}): React.ReactElement {
  const { attributes, listeners, setNodeRef } = useDraggable({ id });
  return (
    <li ref={setNodeRef} {...listeners} {...attributes}>
      {children}
    </li>
  );
}
