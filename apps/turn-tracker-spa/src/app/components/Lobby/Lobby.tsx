import React from 'react';
import SocketProvider, {useSubscription} from '../../socket/SocketProvider';
import useAuthQuery from '../../state/auth';
import {useNavigate, useSearchParams} from 'react-router-dom';
import {environment} from '../../../environments/environment';
import {
  ERROR_EVENT_TYPE,
  ErrorDto,
  LOBBY_NOT_FOUND_EXCEPTION,
  LOBBY_UPDATE_EVENT,
  LobbyDto,
} from '@turn-tracker-nx-nestjs-react/turn-tracker-types';
import {useAtom} from 'jotai';
import lobbyAtom from '../../state/lobby';
import {useSnackbar} from 'notistack';
import GameConfig from './GameConfig/GameConfig';
import Game from './Game/Game';
import {Box} from '@mui/material';

function LobbyComponent(): React.ReactElement {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [lobby, setLobby] = useAtom(lobbyAtom);
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
  return (
    <Box className={'w-full h-full flex justify-center mb-20'}>
      {lobby.status === 'setup' && <GameConfig />}
      {lobby.status === 'inProgress' && <Game />}
    </Box>
  );
}

export default function Lobby(): React.ReactElement {
  const {isSuccess, data} = useAuthQuery();
  const [searchParams] = useSearchParams();
  const lobbyId = searchParams.get("lobby");

  return (
    <SocketProvider
      url={environment.socketUrl}
      path={environment.socketPath}
      open={isSuccess && Boolean(lobbyId)}
      opts={{
        extraHeaders: {authorization: data?.authToken ?? ''},
        query: {lobbyId},
      }}
    >
      <LobbyComponent/>
    </SocketProvider>
  );
}
