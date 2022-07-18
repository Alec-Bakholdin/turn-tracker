import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { LobbyService } from './lobby.service';
import { SocketData } from '../auth/auth.gateway';
import {
  ERROR_EVENT_TYPE,
  Lobby,
  LOBBY_UPDATE_EVENT,
  LobbyDto,
} from '@turn-tracker-nx-nestjs-react/turn-tracker-types';
import { LobbyId } from '../socket-data.decorator';
import { Logger } from '@nestjs/common';
import { LobbyNotFoundException } from '../exceptions/lobby-not-found-exception';

@WebSocketGateway({ cors: true })
export class LobbyGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly lobbyService: LobbyService) {}

  @SubscribeMessage(LOBBY_UPDATE_EVENT)
  lobbyUpdate(
    @LobbyId() lobbyId: string,
    @MessageBody() updatedLobby: Partial<LobbyDto>
  ) {
    this.lobbyService.updateLobby(lobbyId, updatedLobby);
    this.server.to(lobbyId).emit(LOBBY_UPDATE_EVENT, updatedLobby);
  }

  handleConnection(client: Socket) {
    const { user, lobbyId } = client.data as SocketData;
    client.join(lobbyId);
    Logger.log(`Opening socket for ${user}`);

    try {
      const lobby = this.lobbyService.getLobby(lobbyId);
      this.lobbyService.addUserToLobby(lobbyId, user);
      this.sendLobbyUpdate(lobby);
    } catch (e) {
      if (e instanceof LobbyNotFoundException) {
        client.emit(ERROR_EVENT_TYPE, e.toDto());
        Logger.error(e);
        return;
      }
    }
  }

  handleDisconnect(client: Socket) {
    const { user, lobbyId } = client.data as SocketData;
    client.leave(lobbyId);
    Logger.log(`Closing socket for ${user}`);

    try {
      const lobby = this.lobbyService.getLobby(lobbyId);
      this.lobbyService.removeUserFromLobby(lobbyId, user);
      this.sendLobbyUpdate(lobby);
    } catch (e) {
      if (e instanceof LobbyNotFoundException) {
        Logger.error(e);
      }
    }
  }

  private sendLobbyUpdate(lobby: Lobby) {
    this.server.to(lobby.id).emit(LOBBY_UPDATE_EVENT, lobby.toDto());
  }

  private sendPartialLobbyUpdate(lobby: Partial<LobbyDto>) {
    this.server.to(lobby.id).emit(LOBBY_UPDATE_EVENT, lobby);
  }
}
