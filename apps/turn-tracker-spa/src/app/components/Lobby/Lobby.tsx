import React from 'react';
import SocketProvider from '../../socket/SocketProvider';
import useAuthQuery from '../../state/auth';
import { useParams } from 'react-router-dom';
import GameConfig from './GameConfig';
import { environment } from '../../../environments/environment';

export default function Lobby(): React.ReactElement {
  const { isSuccess, data } = useAuthQuery();
  const { lobbyId } = useParams();

  return (
    <SocketProvider
      url={environment.socketBaseUrl}
      open={isSuccess && Boolean(lobbyId)}
      opts={{
        extraHeaders: { authorization: data?.authToken ?? '' },
        query: { lobbyId },
      }}
    >
      <GameConfig />
    </SocketProvider>
  );
}
