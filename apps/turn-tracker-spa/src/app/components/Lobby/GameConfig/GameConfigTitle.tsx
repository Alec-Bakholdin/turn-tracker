import React from 'react';
import { IconButton, Stack, Typography } from '@mui/material';
import { Link, QrCodeRounded } from '@mui/icons-material';

export default function GameConfigTitle(props: {
  id?: string;
}): React.ReactElement {
  return (
    <Stack direction={'row'} className={'align-middle'}>
      <Typography variant={'h4'}>Lobby {props.id}</Typography>
      <IconButton>
        <QrCodeRounded
          fontSize={'medium'}
          className={'rounded-md bg-white p-0.5 ml-2'}
        />
      </IconButton>
      <IconButton>
        <Link fontSize={'medium'} className={'rounded-md bg-white p-0.5'} />
      </IconButton>
    </Stack>
  );
}
