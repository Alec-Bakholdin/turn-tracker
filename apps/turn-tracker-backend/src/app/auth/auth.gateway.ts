import {
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { AuthService } from './auth.service';
import { Socket } from 'socket.io';
import { User } from '@turn-tracker-nx-nestjs-react/turn-tracker-types';
import { Logger } from '@nestjs/common';

export class SocketData {
  user: User = null;
  lobbyId: string = null;
}

@WebSocketGateway({ cors: { origin: '*' } })
export class AuthGateway implements OnGatewayConnection {
  constructor(private readonly authService: AuthService) {}

  @SubscribeMessage('message')
  handleEvent(@MessageBody() msg: string): string {
    return 'event ' + msg;
  }

  handleConnection(client: Socket) {
    const authToken = client.handshake.headers?.authorization;
    const lobbyIdQuery = client.handshake.query['lobbyId'];
    const user: User = this.authService.decodeOrThrow(authToken);
    client.data = {
      user,
      lobbyId: Array.isArray(lobbyIdQuery)
        ? (lobbyIdQuery as string[]).join('')
        : lobbyIdQuery,
    } as SocketData;
    Logger.log(`User ${user} is authenticated`);
  }
}
