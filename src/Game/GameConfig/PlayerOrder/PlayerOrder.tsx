"use client";

import React, { useMemo } from "react";
import { Card, CardContent, CardHeader } from "@mui/material";
import "./PlayerOrder.scss";
import { Game, useGame } from "../../../types/game";
import PlayerOrderRow from "./PlayerOrderRow";
import { useUser } from "../../../types/user";
import DraggableList from "../../../components/DraggableList/DraggableList";

export default function PlayerOrder({
  game,
}: {
  game: Game;
}): React.ReactElement {
  const { updateGame } = useGame();
  const { user } = useUser();
  const order = useMemo(() => {
    return game.playerOrder;
  }, [game.playerOrder]);
  const handleUpdateOrder = (playerOrder: string[]) =>
    updateGame({ playerOrder });
  return (
    <Card className={"player-order"}>
      <CardHeader title={"Player Order"} />
      <CardContent>
        <DraggableList
          items={order}
          setItems={handleUpdateOrder}
          mapItem={(uid) => (
            <PlayerOrderRow
              player={game.playerMap[uid]}
              isSelf={uid === user?.uid}
            />
          )}
        />
      </CardContent>
    </Card>
  );
}
