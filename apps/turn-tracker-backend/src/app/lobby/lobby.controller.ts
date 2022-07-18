import { Controller, Post, Req } from '@nestjs/common';
import { LobbyService } from './lobby.service';
import { AuthService } from '../auth/auth.service';
import { Request } from 'express';
import { LobbyDto } from '@turn-tracker-nx-nestjs-react/turn-tracker-types';

@Controller('lobby')
export class LobbyController {
  constructor(
    private readonly lobbyService: LobbyService,
    private readonly authService: AuthService
  ) {}

  @Post('create')
  createLobby(@Req() request: Request): LobbyDto {
    const authToken = request.headers.authorization;
    this.authService.decodeOrThrow(authToken);
    return this.lobbyService.createLobby().toDto();
  }
}
