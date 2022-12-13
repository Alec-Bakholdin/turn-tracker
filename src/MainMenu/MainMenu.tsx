import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import "./MainMenu.scss";
import { useGame } from "../types/game";
import { useNavigate } from "react-router-dom";

export default function MainMenu(): React.ReactElement {
  const {
    palette: { primary },
  } = useTheme();
  const { createGame } = useGame();
  const navigate = useNavigate();
  const [gameId, setGameId] = useState("");
  const handleJoin = () => {
    navigate(`/game?gameId=${gameId}`);
    setGameId("");
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleJoin();
    }
  };
  const handleCreate = () => createGame();

  return (
    <>
      <Stack alignItems={"center"} justifyContent={"center"} spacing={4}>
        <Box maxWidth={"sm"}>
          <Typography variant={"h2"} textAlign={"center"}>
            Whose Turn is it Anyways?
          </Typography>
        </Box>
        <Card sx={{ minWidth: 400 }}>
          <CardContent>
            <Stack spacing={2}>
              <TextField
                value={gameId}
                onChange={(e) => setGameId(e.target.value)}
                onKeyDown={handleKeyDown}
                fullWidth
                label={"Game ID"}
              />
              <Button fullWidth onClick={handleJoin} variant={"contained"}>
                JOIN
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
      <Box className={"create-new-game-button"} bgcolor={primary.main}>
        <IconButton onClick={handleCreate}>
          <Add sx={{ color: primary.contrastText }} />
        </IconButton>
      </Box>
    </>
  );
}
