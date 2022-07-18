import React, { ReactNode } from 'react';
import { Paper, Typography } from '@mui/material';

export default function GameConfigSection(props: {
  children: ReactNode;
  title?: string;
}): React.ReactElement {
  return (
    <Paper
      className={'border-2 border-white p-4 w-full'}
      sx={{ borderRadius: 5 }}
    >
      <Typography className={'pl-2 pt-1 pb-1'} variant={'h5'}>
        {props.title}
      </Typography>
      {props.children}
    </Paper>
  );
}
