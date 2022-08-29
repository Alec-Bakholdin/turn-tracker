import React from 'react';
import { Stack, Typography } from '@mui/material';
import GameConfigQrCodeButton from './GameConfigQrCodeButton';
import GameConfigCopyUrlToClipboardButton from './GameConfigCopyUrlToClipboardButton';

export default function GameConfigTitle(props: {
  id?: string;
}): React.ReactElement {
  return (
    <Stack direction={'row'} className={'align-middle'}>
      <Typography variant={'h4'}>Lobby {props.id}</Typography>
      <GameConfigQrCodeButton />
      <GameConfigCopyUrlToClipboardButton />
    </Stack>
  );
}
