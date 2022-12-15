"use client";

import React, { useMemo } from "react";
import { Card, CardContent, CardHeader, Stack } from "@mui/material";
import "./PlayerOrder.scss";
import { Game, useGame } from "../../types/game";
import PlayerOrderRow from "./PlayerOrderRow";
import { useUser } from "../../types/user";
import DraggableList from "../../components/DraggableList/DraggableList";

export default function PlayerOrder({
  game,
  draggable,
}: {
  game: Game;
  draggable?: boolean;
}): React.ReactElement {
  const { updateGame } = useGame();
  const { user } = useUser();
  const order = useMemo(() => {
    return game.playerOrder;
  }, [game.playerOrder]);
  const handleUpdateOrder = (playerOrder: string[]) =>
    updateGame({ playerOrder });
  return (
    <Card
      className={"player-order"}
      sx={{
        width: {
          xs: 400,
          sm: 500,
          md: 600,
        },
      }}
    >
      <CardHeader title={"Player Order"} />
      <CardContent>
        {draggable ? (
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
        ) : (
          <Stack>
            {order?.map((uid) => (
              <PlayerOrderRow
                key={uid}
                player={game.playerMap[uid]}
                isSelf={uid === user?.uid}
                isActive={
                  game.activePlayers?.includes(uid) &&
                  !game.readyPlayers?.includes(uid)
                }
              />
            ))}
          </Stack>
        )}
      </CardContent>
    </Card>
  );
}
