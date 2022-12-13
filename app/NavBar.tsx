"use client";

import React, { useState } from "react";
import { useUser } from "hooks/useUser";
import { AppBar, Avatar, Grid, Toolbar, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { Home } from "@mui/icons-material";

export default function NavBar(): React.ReactElement {
  const user = useUser();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const handleNavigate = (page: string) => () => {
    router.push(page);
  };

  return (
    <AppBar position={"static"}>
      <Toolbar>
        <Grid container alignItems={"center"}>
          <Grid item width={"max-content"}>
            <Home />
            <Typography onClick={handleNavigate("/")} variant={"h5"}>
              Home
            </Typography>
          </Grid>
          <Grid item flexGrow={1}></Grid>
          <Grid item>
            <Avatar />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
