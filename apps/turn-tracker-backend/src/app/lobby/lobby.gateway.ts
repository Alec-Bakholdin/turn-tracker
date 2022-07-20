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
  LOBBY_PLAYER_READY_EVENT,
  LOBBY_START_GAME_EVENT,
  LOBBY_UPDATE_EVENT,
  LobbyDto,
  UserDto,
} from '@turn-tracker-nx-nestjs-react/turn-tracker-types';
import { LobbyId, User } from '../socket-data.decorator';
import { Logger, UseFilters } from '@nestjs/common';
import { LobbyNotFoundException } from '../exceptions/lobby-not-found-exception';
import { WebsocketUserExceptionFilter } from '../exceptions/websocket-user-exception.filter';

@WebSocketGateway({ cors: true })
@UseFilters(new WebsocketUserExceptionFilter())
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
    this.sendPartialLobbyUpdate(lobbyId, updatedLobby);
  }

  @SubscribeMessage(LOBBY_START_GAME_EVENT)
  gameStart(@LobbyId() lobbyId: string) {
    const lobby = this.lobbyService.startGame(lobbyId);
    this.sendLobbyUpdate(lobby);
  }

  @SubscribeMessage(LOBBY_PLAYER_READY_EVENT)
  playerReady(@LobbyId() lobbyId: string, @User() user: UserDto) {
    const { id: userId } = user;
    const lobbyUpdate = this.lobbyService.playerReady(lobbyId, userId);
    this.sendPartialLobbyUpdate(lobbyId, lobbyUpdate);
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
    const lobbyDto = lobby.toDto();
    this.server.to(lobby.id).emit(LOBBY_UPDATE_EVENT, lobbyDto);
  }

  private sendPartialLobbyUpdate(
    lobbyId: string,
    lobbyUpdate: Partial<LobbyDto>
  ) {
    this.server.to(lobbyId).emit(LOBBY_UPDATE_EVENT, lobbyUpdate);
  }
}
