import React, { useState } from 'react';
import { Stack, TextField, Typography } from '@mui/material';
import { Edit } from '@mui/icons-material';
import useAuthQuery from '../../state/auth';

export default function UsernameEditor(): React.ReactElement {
  const [isEditing, setIsEditing] = useState(false);
  const { authDto, updateUserDto } = useAuthQuery();
  const username = authDto?.user?.name;
  const [updatedUsername, setUpdatedUsername] = useState(username);

  const stopEditing = () => {
    setUpdatedUsername(undefined);
    setIsEditing(false);
  };
  const startEditing = () => {
    setUpdatedUsername(username);
    setIsEditing(true);
  };
  const handleSubmit = () => {
    if (updatedUsername && updatedUsername !== username) {
      updateUserDto({ name: updatedUsername });
    }
    stopEditing();
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.stopPropagation();
      e.preventDefault();
      handleSubmit();
    }
  };
  const handleOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    e.preventDefault();
    setUpdatedUsername(e.target.value);
  };

  return (
    <Stack
      className={'h-8'}
      direction={'row'}
      spacing={1}
      alignItems={'center'}
    >
      {isEditing && (
        <TextField
          label={'Username'}
          onBlur={stopEditing}
          onKeyDown={handleKeyDown}
          onChange={handleOnChange}
          value={updatedUsername}
          className={'w-fit'}
          autoFocus
          onFocus={handleOnFocus}
        />
      )}
      {!isEditing && (
        <>
          <Typography>{username ?? 'Username'}</Typography>
          <Edit
            onClick={startEditing}
            className={'hover:fill-blue-200 hover:cursor-pointer'}
          />
        </>
      )}
    </Stack>
  );
}
