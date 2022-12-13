import React from "react";
import NavBar from "./NavBar/NavBar";
import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import GameProvider from "./GameProvider";

export default function App(): React.ReactElement {
  return (
    <GameProvider>
      <Container maxWidth={"md"} sx={{ paddingTop: 5 }}>
        <Outlet />
      </Container>
      <NavBar />
    </GameProvider>
  );
}
