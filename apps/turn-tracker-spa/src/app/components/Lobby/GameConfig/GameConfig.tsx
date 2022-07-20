import React from 'react';
import { Button, Paper, Stack } from '@mui/material';
import { useSocket } from '../../../socket/SocketProvider';
import {
  LOBBY_START_GAME_EVENT,
  LOBBY_UPDATE_EVENT,
  LobbyDto,
} from '@turn-tracker-nx-nestjs-react/turn-tracker-types';
import { useAtom } from 'jotai';
import lobbyAtom from '../../../state/lobby';
import GameTypeSelector from './GameTypeSelector';
import PlayerList from './PlayerList/PlayerList';
import TurnCountSelector from './TurnCountSelector';

export default function GameConfig(): React.ReactElement {
  const [lobby] = useAtom(lobbyAtom);
  const socket = useSocket();

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
    <Stack
      className={'!mt-10 !h-fit w-1/2 min-w-[400px] items-center'}
      spacing={2}
    >
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
