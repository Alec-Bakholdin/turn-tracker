import React from "react";
import ReactDOM from "react-dom/client";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { SnackbarProvider } from "notistack";
import { theme } from "./theme";
import UserProvider from "./UserProvider";
import { CookiesProvider } from "react-cookie";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainMenu from "./MainMenu/MainMenu";
import "./main.scss";
import App from "./App";
import Profile from "./Profile/Profile";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/",
          element: <MainMenu />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
      ],
    },
  ]
  /*{ basename: "/turn-tracker" }*/
);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider>
        <CookiesProvider>
          <UserProvider>
            <RouterProvider router={router} />
          </UserProvider>
        </CookiesProvider>
      </SnackbarProvider>
    </ThemeProvider>
  </React.StrictMode>
);
