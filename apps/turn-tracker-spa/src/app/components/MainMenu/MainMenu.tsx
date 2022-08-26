import React, {useState} from 'react';
import {Box, Button, Stack, TextField, Typography} from '@mui/material';
import {Settings} from '@mui/icons-material';
import UsernameEditor from './UsernameEditor';
import {useNavigate} from 'react-router-dom';
import useAuthQuery from '../../state/auth';
import api from '../../api/api';

export default function MainMenu(): React.ReactElement {
  const {authDto} = useAuthQuery();
  const navigate = useNavigate();
  const [lobbyId, setLobbyId] = useState<string>('');

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    setLobbyId(e.target.value);
  };

  const handleJoinLobby = () => {
    if (lobbyId) {
      window.scrollTo({top: 0});
      navigate({
        pathname: '',
        search: `?lobby=${lobbyId}`
      });
    }
  };
  const handleOnKeyDownLobby = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.stopPropagation();
      e.preventDefault();
      handleJoinLobby();
    }
  };
  const handleCreateLobby = async () => {
    if (authDto) {
      const lobbyResponse = await api.createLobby(authDto.authToken);
      if (lobbyResponse.status >= 200 && lobbyResponse.status < 300) {
        navigate({
          pathname: '',
          search: `?lobby=${lobbyResponse.data.id}`
        });
      }
    }
  };

  return (
    <Stack
      className={'pb-10 w-1/2 h-fit max-w-md mt-5'}
      spacing={4}
      alignItems={'center'}
    >
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
        onKeyDown={handleOnKeyDownLobby}
      />
      <Button className={'w-fit'} onClick={handleJoinLobby}>
        Join Lobby
      </Button>
      <Button className={'w-fit'} onClick={handleCreateLobby}>
        Create Lobby
      </Button>
      <Box flex={3} />
    </Stack>
  );
}
