import React, { useState } from 'react';
import { Button } from '@mui/material';
import { useSocket, useSubscription } from '../../socket/SocketProvider';

export default function GameConfig(props: {
  lobbyId: string;
}): React.ReactElement {
  const [message, setMessage] = useState('');
  const socket = useSocket();
  useSubscription('message', (msg) => setMessage(message + ' ' + msg));

  return (
    <>
      <Button onClick={() => socket?.emit('message', 'test this')}>
        MESSAGE
      </Button>
      <div>{message}</div>
    </>
  );
}
