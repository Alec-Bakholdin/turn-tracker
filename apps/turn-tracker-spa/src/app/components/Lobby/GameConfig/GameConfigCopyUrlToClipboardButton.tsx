import React, { useState } from 'react';
import { Box, IconButton, Popover, Typography } from '@mui/material';
import { Link } from '@mui/icons-material';

export default function GameConfigCopyUrlToClipboardButton(): React.ReactElement {
  const [open, setOpen] = useState(false);
  let timeout: NodeJS.Timeout | undefined;

  const handleOpen = () => {
    timeout = setTimeout(() => {
      timeout = undefined;
      setOpen(false);
    }, 1000);
    setOpen(true);
  };
  const handleClose = () => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = undefined;
    }
    setOpen(false);
  };

  const copyUrlToClipboard = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => handleOpen());
  };

  return (
    <>
      <Popover
        open={open}
        onClose={handleClose}
        anchorReference={'anchorPosition'}
        transformOrigin={{ vertical: 'center', horizontal: 'center' }}
        anchorPosition={{ top: 0, left: window.innerWidth / 2 }}
      >
        <Box className={'m-4'}>
          <Typography>URL copied to clipboard</Typography>
        </Box>
      </Popover>
      <IconButton onClick={copyUrlToClipboard}>
        <Link fontSize={'medium'} className={'rounded-md bg-white p-0.5'} />
      </IconButton>
    </>
  );
}
