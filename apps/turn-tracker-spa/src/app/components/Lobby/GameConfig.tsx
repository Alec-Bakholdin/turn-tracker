import React from 'react';
import { Button, Paper, Stack } from '@mui/material';
import { useSocket, useSubscription } from '../../socket/SocketProvider';
import {
  ERROR_EVENT_TYPE,
  ErrorDto,
  LOBBY_NOT_FOUND_EXCEPTION,
  LOBBY_START_GAME_EVENT,
  LOBBY_UPDATE_EVENT,
  LobbyDto,
} from '@turn-tracker-nx-nestjs-react/turn-tracker-types';
import { useAtom } from 'jotai';
import lobbyAtom from '../../state/lobby';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import GameTypeSelector from './GameTypeSelector';
import PlayerList from './PlayerList/PlayerList';
import TurnCountSelector from './TurnCountSelector';

export default function GameConfig(): React.ReactElement {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [lobby, setLobby] = useAtom(lobbyAtom);
  const socket = useSocket();
  useSubscription(LOBBY_UPDATE_EVENT, (updatedLobby: Partial<LobbyDto>) => {
    setLobby({ ...lobby, ...updatedLobby });
    console.log('Updated lobby with', updatedLobby);
  });
  useSubscription(ERROR_EVENT_TYPE, (error: ErrorDto) => {
    enqueueSnackbar(error.message, {
      variant: 'error',
      autoHideDuration: 1500,
    });
    if (error.type === LOBBY_NOT_FOUND_EXCEPTION) {
      navigate('/');
    }
  });
  const handleStart = () => {
    socket?.emit(LOBBY_START_GAME_EVENT);
  };

  const gameConfigProps = {
    ...lobby,
    onLobbyUpdate: (lobbyUpdate: Partial<LobbyDto>) => {
      socket?.emit(LOBBY_UPDATE_EVENT, lobbyUpdate);
    },
  };
  return (
    <Stack className={'!mt-10 w-1/2 min-w-[400px] items-center'} spacing={2}>
      <GameTypeSelector {...gameConfigProps} />
      <PlayerList {...gameConfigProps} />
      {lobby.gameConfig.editableTurns && (
        <TurnCountSelector {...gameConfigProps} />
      )}
      <Paper className={'w-1/2 !max-w-[50%]'}>
        <Button onClick={handleStart} className={'w-full'}>
          START
        </Button>
      </Paper>
    </Stack>
  );
}
