import React from 'react';
import { Box } from '@mui/material';

export default function NoRouteMatch(): React.ReactElement {
  return (
    <Box className={'w-full h-full flex justify-center items-center'}>
      <h1 className={'text-8xl text-red-100'}>404 idiot</h1>
    </Box>
  );
}
