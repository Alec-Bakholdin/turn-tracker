import React, { useMemo } from "react";
import { Phase } from "../../../types/phase";
import {
  Box,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  Stack,
  TextField,
} from "@mui/material";
import { gameRef, useGame } from "../../../types/game";
import { remove, update } from "firebase/database";
import { Delete } from "@mui/icons-material";

export default function PhaseRow({
  phase,
}: {
  phase: Phase;
}): React.ReactElement {
  const phaseName = useMemo(() => phase.name, [phase.name]);
  const { game, updateGame } = useGame();
  const phaseRef = () => gameRef(game!.id, "phaseMap", phase.id);
  const handleEditPhase = async (phaseUpdate: Partial<Phase>) => {
    await update(phaseRef(), phaseUpdate);
  };
  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) =>
    handleEditPhase({ name: e.target.value });
  const handleToggleSimultaneous = () =>
    handleEditPhase({ simultaneous: !phase.simultaneous });
  const handleRemove = async () => {
    const phaseOrder = game!.phaseOrder?.filter((id) => id !== phase.id) || [];
    await updateGame({ phaseOrder });
    await remove(phaseRef());
  };

  return (
    <Stack
      direction={"row"}
      className={"phase-row"}
      bgcolor={"background.default"}
    >
      <Grid container>
        <Grid item xs={12}>
          <TextField
            value={phase.name}
            onChange={handleChangeName}
            label={"Name"}
          />
        </Grid>
        <Grid item>
          <FormControl>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={handleToggleSimultaneous}
                  checked={phase.simultaneous}
                />
              }
              label={"Simultaneous"}
            />
          </FormControl>
        </Grid>
      </Grid>
      <Box display={"flex"} alignItems={"center"}>
        <IconButton onClick={handleRemove}>
          <Delete />
        </IconButton>
      </Box>
    </Stack>
  );
}
