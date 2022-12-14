import React, { useMemo } from "react";
import { Box, Card, CardContent, CardHeader, IconButton } from "@mui/material";
import { Game, gameRef, useGame } from "../../../types/game";
import { newPhase, PhaseMap } from "../../../types/phase";
import DraggableList from "../../../components/DraggableList/DraggableList";
import PhaseRow from "./PhaseRow";
import "./PhaseCreator.scss";
import { Add } from "@mui/icons-material";
import { set } from "firebase/database";

export default function PhaseCreator({
  game,
}: {
  game: Game;
}): React.ReactElement {
  const { updateGame } = useGame();
  const phases = useMemo(() => game.phaseOrder || [], [game.phaseOrder]);
  const phaseMap: PhaseMap = game.phaseMap || {};
  const updatePhaseOrder = async (phaseOrder: string[]) =>
    updateGame({ phaseOrder });
  const handleCreatePhase = async () => {
    const createdPhase = newPhase();
    const phaseRef = gameRef(game.id, "phaseMap", createdPhase.id);
    await set(phaseRef, createdPhase);
    await updateGame({ phaseOrder: [...phases, createdPhase.id] });
  };

  return (
    <Card className={"phase-creator"}>
      <CardHeader title={"Phase Configuration"} />
      <CardContent>
        <DraggableList
          items={phases}
          setItems={updatePhaseOrder}
          mapItem={(item) => <PhaseRow phase={phaseMap[item]} />}
          useHandle
        />
        <Box display={"flex"} justifyContent={"center"}>
          <IconButton
            className={"add-phase-button"}
            onClick={handleCreatePhase}
          >
            <Add />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
}