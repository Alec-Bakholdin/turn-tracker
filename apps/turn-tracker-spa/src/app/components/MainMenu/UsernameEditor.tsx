import React, { useState } from 'react';
import { IconButton, Stack, TextField, Typography } from '@mui/material';
import { Cancel, Check, Edit } from '@mui/icons-material';
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
    console.log('submitting');
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
      width={'100%'}
      alignItems={'center'}
    >
      {isEditing && (
        <>
          <TextField
            label={'Username'}
            onKeyDown={handleKeyDown}
            onChange={handleOnChange}
            value={updatedUsername}
            className={'w-fit'}
            autoFocus
            onFocus={handleOnFocus}
          />
          <IconButton onClick={handleSubmit}>
            <Check className={'text-green-400 hover:text-green-200'} />
          </IconButton>
          <IconButton onClick={stopEditing}>
            <Cancel className={'text-red-400 hover:text-red-200'} />
          </IconButton>
        </>
      )}
      {!isEditing && (
        <>
          <Typography>{username ?? 'Username'}</Typography>
          <IconButton onClick={startEditing}>
            <Edit className={'text-white hover:fill-blue-200'} />
          </IconButton>
        </>
      )}
    </Stack>
  );
}
