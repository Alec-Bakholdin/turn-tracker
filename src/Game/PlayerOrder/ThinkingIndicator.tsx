import React from "react";
import { Box, Stack } from "@mui/material";
import "./ThinkingIndicator.scss";

export default function ThinkingIndicator(): React.ReactElement {
  return (
    <Stack direction={"row"} spacing={0.7} className={"thinking-indicator"}>
      <Box bgcolor={"white"} className={"thinking-indicator-dot"} />
      <Box bgcolor={"white"} className={"thinking-indicator-dot"} />
      <Box bgcolor={"white"} className={"thinking-indicator-dot"} />
    </Stack>
  );
}
