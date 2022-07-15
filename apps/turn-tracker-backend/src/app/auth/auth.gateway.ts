import {
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { AuthService } from './auth.service';
import { Socket } from 'socket.io';
import { UserDto } from '@turn-tracker-nx-nestjs-react/turn-tracker-types';

export interface SocketData {
  user: UserDto;
  lobbyId: string;
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
    client.data = {
      user: this.authService.decodeOrThrow(authToken),
      lobbyId: Array.isArray(lobbyIdQuery)
        ? (lobbyIdQuery as string[]).join('')
        : lobbyIdQuery,
    } as SocketData;
    console.log('User is authenticated: ', client.data);
  }
}
