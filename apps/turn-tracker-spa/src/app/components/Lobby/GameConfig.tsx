import React from 'react';
import { Stack } from '@mui/material';
import { useSocket, useSubscription } from '../../socket/SocketProvider';
import {
  ERROR_EVENT_TYPE,
  ErrorDto,
  LOBBY_NOT_FOUND_EXCEPTION,
  LOBBY_UPDATE_EVENT,
} from '@turn-tracker-nx-nestjs-react/turn-tracker-types';
import { useAtom } from 'jotai';
import lobbyAtom from '../../state/lobby';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

export default function GameConfig(props: {
  lobbyId: string;
}): React.ReactElement {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [lobby, setLobby] = useAtom(lobbyAtom);
  const socket = useSocket();
  useSubscription(LOBBY_UPDATE_EVENT, (msg) => {
    console.log(msg);
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

  return <Stack></Stack>;
}
