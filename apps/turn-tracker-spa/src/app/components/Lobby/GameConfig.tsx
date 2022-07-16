import React from 'react';
import { Grid } from '@mui/material';
import { useSocket, useSubscription } from '../../socket/SocketProvider';
import {
  ERROR_EVENT_TYPE,
  ErrorDto,
  LOBBY_NOT_FOUND_EXCEPTION,
  LOBBY_UPDATE_EVENT,
  LobbyDto,
} from '@turn-tracker-nx-nestjs-react/turn-tracker-types';
import { useAtom } from 'jotai';
import lobbyAtom from '../../state/lobby';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import GameTypeSelector from './GameTypeSelector';

export default function GameConfig(props: {
  lobbyId: string;
}): React.ReactElement {
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

  const onLobbyUpdate = (lobbyUpdate: Partial<LobbyDto>) => {
    socket?.emit(LOBBY_UPDATE_EVENT, lobbyUpdate);
  };

  return (
    <Grid container className={'w-full h-full pt-10'} justifyContent={'center'}>
      <Grid item className={'w-full flex justify-center'}>
        <GameTypeSelector
          gameType={lobby.gameType}
          onLobbyUpdate={onLobbyUpdate}
        />
      </Grid>
    </Grid>
  );
}
