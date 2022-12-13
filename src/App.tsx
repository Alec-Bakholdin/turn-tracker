import React from "react";
import NavBar from "./NavBar/NavBar";

export default function App({
  children,
}: {
  children?: React.ReactNode;
}): React.ReactElement {
  return (
    <>
      {children}
      <NavBar />
    </>
  );
}
