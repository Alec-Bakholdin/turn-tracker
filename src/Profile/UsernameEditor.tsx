import React, { useState } from "react";
import { IconButton, Stack, TextField, Typography } from "@mui/material";
import { useUser } from "../types/user";
import { Check, Clear, Edit } from "@mui/icons-material";

export default function UsernameEditor(): React.ReactElement {
  const { user, updateUser } = useUser();
  const [username, setUsername] = useState<string | undefined>(undefined);
  const handleStartEditing = () => setUsername(user?.username || "");
  const handleCancelEdit = () => setUsername(undefined);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUsername(e.target.value);
  const handleConfirmEdit = () => {
    updateUser({ username });
    setUsername(undefined);
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleConfirmEdit();
    }
  };

  return (
    <Stack direction={"row"} alignItems={"center"} spacing={1}>
      {username === undefined ? (
        <>
          <Typography variant={"body1"}>
            <b>Username: </b>
            {user?.username}
          </Typography>
          <IconButton onClick={handleStartEditing}>
            <Edit />
          </IconButton>
        </>
      ) : (
        <>
          <TextField
            value={username}
            onChange={handleChange}
            label={"Username"}
            onKeyDown={handleKeyDown}
          />
          <IconButton onClick={handleConfirmEdit}>
            <Check />
          </IconButton>
          <IconButton onClick={handleCancelEdit}>
            <Clear />
          </IconButton>
        </>
      )}
    </Stack>
  );
}
