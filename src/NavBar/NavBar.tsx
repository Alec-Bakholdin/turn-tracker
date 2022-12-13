import React from "react";
import { AppBar, Stack, Toolbar } from "@mui/material";
import { Home, Person } from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function NavBar(): React.ReactElement {
  return (
    <AppBar position={"fixed"} sx={{ top: "auto", bottom: 0 }}>
      <Toolbar>
        <Stack
          direction={"row"}
          width={"100%"}
          justifyContent={"center"}
          spacing={4}
        >
          <Link to={"/"}>
            <Home />
          </Link>
          <Link to={"/profile"}>
            <Person />
          </Link>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
