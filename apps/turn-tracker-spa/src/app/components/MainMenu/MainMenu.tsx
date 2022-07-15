import React, { useState } from 'react';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { Settings } from '@mui/icons-material';
import UsernameEditor from './UsernameEditor';
import { useNavigate } from 'react-router-dom';

export default function MainMenu(): React.ReactElement {
  const navigate = useNavigate();
  const [lobbyId, setLobbyId] = useState<string>('');

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setLobbyId(e.target.value);
  };

  const handleSubmit = () => {
    if (lobbyId) {
      navigate(lobbyId);
    }
  };
  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.stopPropagation();
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <Stack className={'w-1/2 max-w-md mt-5'} spacing={4} alignItems={'center'}>
      <Stack width={'100%'} direction={'row'} justifyContent={'space-between'}>
        <UsernameEditor />
        <Settings />
      </Stack>
      <Box flex={1} />
      <Typography variant={'h3'} textAlign={'center'}>
        Whose Turn is it Anyways?
      </Typography>
      <TextField
        label={'Lobby ID'}
        onChange={handleOnChange}
        onKeyDown={handleOnKeyDown}
      />
      <Button className={'w-fit'} onClick={handleSubmit}>
        Join Lobby
      </Button>
      <Box flex={3} />
    </Stack>
  );
}
