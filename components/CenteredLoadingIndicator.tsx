import React from "react";
import { Box, CircularProgress } from "@mui/material";

export default function CenteredLoadingIndicator({
  size = 25,
}): React.ReactElement {
  return (
    <Box
      height={"100%"}
      width={"100%"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <CircularProgress size={size} />
    </Box>
  );
}
