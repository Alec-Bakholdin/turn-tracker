import React from 'react';
import { useAtom } from 'jotai';
import lobbyAtom from '../../../state/lobby';
import { useSocket } from '../../../socket/SocketProvider';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import { LOBBY_PLAYER_READY_EVENT } from '@turn-tracker-nx-nestjs-react/turn-tracker-types';
import useAuthQuery from '../../../state/auth';
import { Check } from '@mui/icons-material';

export default function Game(): React.ReactElement {
  const { authDto } = useAuthQuery();
  const [{ activeUsers }] = useAtom(lobbyAtom);
  const socket = useSocket();

  const isActive = authDto?.user?.id && activeUsers.includes(authDto.user.id);
  const handlePassTurn = () => socket?.emit(LOBBY_PLAYER_READY_EVENT);
  return (
    <Box className={'w-full h-screen fixed flex justify-center'}>
      <Stack className={'!mt-10 w-1/2 min-w-[400px] items-center'}>
        {isActive && (
          <>
            <Typography>It's your turn!</Typography>
            <Stack direction={'row'}>
              <IconButton onClick={handlePassTurn}>
                <Check
                  className={
                    '!text-9xl bg-green-800 rounded-[800px] hover:bg-green-400'
                  }
                  color={'success'}
                />
              </IconButton>
            </Stack>
          </>
        )}
      </Stack>
    </Box>
    /*<Box className={'!mt-10 w-1/2 min-w-[400px] items-center border-4'}>
      game in progress
      <Button onClick={() => socket?.emit(LOBBY_PLAYER_READY_EVENT)}>
        test
      </Button>
    </Box>*/
  );
}
