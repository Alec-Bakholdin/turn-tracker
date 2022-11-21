"use client";

import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "../config/theme";
import React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Container maxWidth={"md"}>{children}</Container>
        </ThemeProvider>
      </body>
    </html>
  );
}
