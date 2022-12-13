"use client";

import React, { useEffect, useState } from "react";
import { theme } from "config/theme";
import { SnackbarProvider, useSnackbar } from "notistack";
import { ThemeProvider } from "@mui/material";
import { signInAnonymously, User } from "@firebase/auth";
import { auth } from "config/firebaseApp";
import { UserContext } from "hooks/useUser";
import { CookiesProvider, useCookies } from "react-cookie";

function UserProvider({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  const { enqueueSnackbar } = useSnackbar();
  const [{ username }, setCookies] = useCookies(["username"]);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    signInAnonymously(auth)
      .then((user) => {
        console.log("Logged in successfully", user.user.uid);
        setUser(user.user);
        if (!username) {
          setCookies("username", user.user.uid.slice(0, 5).toUpperCase());
        }
      })
      .catch((e) => {
        console.error(e);
        enqueueSnackbar("There was an error during authentication");
      });
  }, []);
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <CookiesProvider>
          <UserProvider>{children}</UserProvider>
        </CookiesProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}
