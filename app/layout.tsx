"use client";

import { Container, CssBaseline } from "@mui/material";
import React from "react";
import Providers from "./Providers";
import NavBar from "app/NavBar";
import "./styles.scss";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <Providers>
        <CssBaseline />
        <body>
          <NavBar />
          <Container maxWidth={"md"}>{children}</Container>
        </body>
      </Providers>
    </html>
  );
}
