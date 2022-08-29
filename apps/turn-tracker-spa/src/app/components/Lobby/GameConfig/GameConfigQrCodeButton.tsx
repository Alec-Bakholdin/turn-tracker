import React, { useState } from 'react';
import { Box, IconButton, Popover } from '@mui/material';
import { Close, QrCodeRounded } from '@mui/icons-material';
import QrCodeComponent from 'react-qr-code';

export default function GameConfigQrCodeButton(): React.ReactElement {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const qrCodeSize = Math.min(window.innerWidth, window.innerHeight) - 75;
  return (
    <>
      <IconButton onClick={handleOpen}>
        <QrCodeRounded
          fontSize={'medium'}
          className={'rounded-md bg-white p-0.5 ml-2'}
        />
      </IconButton>
      <Popover
        open={open}
        onClose={handleClose}
        anchorReference={'anchorPosition'}
        anchorPosition={{ top: 0, left: 0 }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
      >
        <Box className={'bg-gray-600 p-5 flex flex-col'}>
          <Box className={'flex flex-row w-full justify-end'}>
            <IconButton onClick={handleClose}>
              <Close />
            </IconButton>
          </Box>
          <QrCodeComponent value={window.location.href} size={qrCodeSize} />
        </Box>
      </Popover>
    </>
  );
}
