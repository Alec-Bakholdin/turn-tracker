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
  const qrCodeSize =
    window.innerWidth < window.innerHeight
      ? window.innerWidth - 75
      : window.innerHeight - 130;
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
        anchorPosition={{
          top: window.innerHeight / 2 - 20,
          left: window.innerWidth / 2,
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'center',
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
