import React from 'react';
import { IconButton, Stack, Typography } from '@mui/material';
import { Link } from '@mui/icons-material';
import GameConfigQrCodeButton from './GameConfigQrCodeButton';

export default function GameConfigTitle(props: {
  id?: string;
}): React.ReactElement {
  return (
    <Stack direction={'row'} className={'align-middle'}>
      <Typography variant={'h4'}>Lobby {props.id}</Typography>
      <GameConfigQrCodeButton />
      <IconButton>
        <Link fontSize={'medium'} className={'rounded-md bg-white p-0.5'} />
      </IconButton>
    </Stack>
  );
}
