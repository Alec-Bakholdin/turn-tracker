"use client";

import React, { useEffect } from "react";
import { useGame } from "hooks/useGame";
import { CircularProgress } from "@mui/material";
import { useRouter } from "next/navigation";

export default function EmptyGame(): React.ReactElement {
  const router = useRouter();
  const { game, loading } = useGame();
  useEffect(() => {
    if (!loading && game) {
      router.push(`/game/${game.id}`);
    } else {
      router.push("/");
    }
  }, [game?.id, loading]);
  return (
    <>
      <CircularProgress />
    </>
  );
}
