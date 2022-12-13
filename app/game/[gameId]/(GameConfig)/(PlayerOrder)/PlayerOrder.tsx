"use client";

import React, { useMemo } from "react";
import { Card, CardContent, CardHeader } from "@mui/material";
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { Game, gameRef } from "types/Game";
import PlayerOrderRow from "app/game/[gameId]/(GameConfig)/(PlayerOrder)/PlayerOrderRow";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { update } from "@firebase/database";
import "./PlayerOrder.css";

export default function PlayerOrder({
  game,
}: {
  game: Game;
}): React.ReactElement {
  const order = useMemo(() => {
    return game.playerOrder;
  }, [game.playerOrder]);
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );
  const handleDragEnd = async (e: DragEndEvent) => {
    const { active, over } = e;
    const oldIndex = order.indexOf(active.id.toString());
    const newIndex = over ? order.indexOf(over.id.toString()) : -1;
    const playerOrder = arrayMove(order, oldIndex, newIndex);
    await update(gameRef(game), { playerOrder });
  };

  return (
    <Card>
      <CardHeader title={"Player Order"} />
      <CardContent>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={order} strategy={verticalListSortingStrategy}>
            {order.map((uid) => (
              <PlayerOrderRow key={uid} id={uid} player={game.playerMap[uid]} />
            ))}
          </SortableContext>
        </DndContext>
      </CardContent>
    </Card>
  );
}
