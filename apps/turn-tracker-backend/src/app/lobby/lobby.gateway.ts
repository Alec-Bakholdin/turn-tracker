import {
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { LobbyService } from './lobby.service';
import { SocketData } from '../auth/auth.gateway';
import {
  ERROR_EVENT_TYPE,
  ErrorDto,
  LOBBY_UPDATE_EVENT,
  UserDto,
} from '@turn-tracker-nx-nestjs-react/turn-tracker-types';
import { User } from '../socket-data.decorator';

@WebSocketGateway({ cors: true })
export class LobbyGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Socket;

  constructor(private readonly lobbyService: LobbyService) {}

  @SubscribeMessage('message')
  handleMessage(@User() user: UserDto): WsResponse<string> {
    console.log(user);
    return { event: 'message', data: JSON.stringify(user) };
  }

  handleConnection(client: Socket) {
    if (!client?.data) {
      return;
    }
    const { user, lobbyId } = client.data as SocketData;
    client.join(lobbyId);
    const lobby = this.lobbyService.getLobby(lobbyId);
    if (!lobby) {
      client.emit(ERROR_EVENT_TYPE, {
        message: 'Lobby does not exist',
        type: 'user',
      } as ErrorDto);
    } else if (this.lobbyService.addUserToLobby(lobbyId, user)) {
      this.server.to(lobbyId).emit(LOBBY_UPDATE_EVENT, lobby);
    }
  }
}
