import React from "react";
import NavBar from "./NavBar/NavBar";
import { Container } from "@mui/material";
import { Outlet } from "react-router-dom";

export default function App(): React.ReactElement {
  return (
    <>
      <Container maxWidth={"md"} sx={{ paddingTop: 5 }}>
        <Outlet />
      </Container>
      <NavBar />
    </>
  );
}
