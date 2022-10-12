import { useAtom } from 'jotai';
import lobbyAtom from '../../../state/lobby';
import { useSocket } from '../../../socket/SocketProvider';
import { Box, IconButton, Stack, Typography, Popover } from '@mui/material';
import { LOBBY_PLAYER_READY_EVENT } from '@turn-tracker-nx-nestjs-react/turn-tracker-types';
import useAuthQuery from '../../../state/auth';
import { Check, Casino } from '@mui/icons-material';
import DiceRoll from '../../DiceRoll';
import React from "react";

export default function Game(): React.ReactElement {
  const { authDto } = useAuthQuery();
  const [{ activeUsers }] = useAtom(lobbyAtom);
  const socket = useSocket();

  //TESTING SOCKET STUFF
  const [lobby] = useAtom(lobbyAtom);
  const currentUserIndex = lobby.activeUserIndex
  const userOrder = lobby.userOrder
  const users = lobby.users
  const currentUserName = users[userOrder[currentUserIndex]].name
  //const test = users[activeUser]


  const isActive = authDto?.user?.id && activeUsers.includes(authDto.user.id);
  const handlePassTurn = () => socket?.emit(LOBBY_PLAYER_READY_EVENT);

  //EXPERIMENTAL BUT I THINK IT WORKS
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const triggerArr: string[] = ['click','Enter']

  return (
    <Box className={'w-full h-screen fixed items-center flex flex-col'}>
        <div className = {'mt-10'}>
          Waiting on {currentUserName} to complete their turn
        </div>

        <div>

        </div>

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

        <Stack className={'!mt-10 w-1/2 min-w-[400px] items-center'}>
          <Typography>Roll a D6</Typography>
          <IconButton onClick={handleClick}>
            <Casino className={'!text-9xl'} color={'primary'} />
          </IconButton>
        </Stack>

        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
        >

          <div id = "diceWrapper" className = "grid place-items-center m-5 rounded-t-3xl">
            <DiceRoll size={100} rollingTime={500} triggers = {triggerArr} />
          </div>
        </Popover>

      </Box>


    //<DiceRoll size={100} rollingTime={500} />

    /*<Box className={'!mt-10 w-1/2 min-w-[400px] items-center border-4'}>
      game in progress
      <Button onClick={() => socket?.emit(LOBBY_PLAYER_READY_EVENT)}>
        test
      </Button>
    </Box>*/
  );
}
