"use client";

import { Container, CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "config/theme";
import React, { useEffect } from "react";
import { auth } from "config/firebaseApp";
import { signInAnonymously } from "@firebase/auth";
import { SnackbarProvider, useSnackbar } from "notistack";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <ThemeProvider theme={theme}>
          <SnackbarProvider>
            <CssBaseline />
            <Container maxWidth={"md"}>
              <RootLayoutWithContext>{children}</RootLayoutWithContext>
            </Container>
          </SnackbarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

function RootLayoutWithContext({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    signInAnonymously(auth)
      .then((user) => {
        console.log("Logged in successfully", user.user.uid);
      })
      .catch((e) => {
        console.error(e);
        enqueueSnackbar("There was an error during authentication");
      });
  }, []);

  return <>{children}</>;
}
