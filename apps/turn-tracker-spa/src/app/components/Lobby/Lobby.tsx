import React from 'react';
import SocketProvider, { useSubscription } from '../../socket/SocketProvider';
import useAuthQuery from '../../state/auth';
import { useParams } from 'react-router-dom';
import GameConfig from './GameConfig';
import { LOBBY_UPDATE_EVENT } from '@turn-tracker-nx-nestjs-react/turn-tracker-types';
import { useAtom } from 'jotai';
import lobbyAtom from '../../state/lobby';
import { environment } from '../../../environments/environment';

export default function Lobby(): React.ReactElement {
  const { isSuccess, data } = useAuthQuery();
  const { lobbyId } = useParams();
  const [lobby, setLobby] = useAtom(lobbyAtom);
  useSubscription(LOBBY_UPDATE_EVENT, (msg) => {
    console.log(msg);
  });

  return (
    <SocketProvider
      url={environment.socketBaseUrl}
      open={isSuccess}
      opts={{
        extraHeaders: { authorization: data?.authToken ?? '' },
        query: { lobbyId },
      }}
    >
      {lobbyId && <GameConfig lobbyId={lobbyId} />}
    </SocketProvider>
  );
}
