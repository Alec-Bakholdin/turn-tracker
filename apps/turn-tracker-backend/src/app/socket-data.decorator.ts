import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { SocketData } from './auth/auth.gateway';
import { Socket } from 'socket.io';

const extractSocketData = (ctx: ExecutionContext): SocketData => {
  const socket = ctx.switchToWs().getClient<Socket>();
  return socket.data as SocketData;
};

export const Data = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    if (data) {
      return extractSocketData(ctx)[data];
    }
    return extractSocketData(ctx);
  }
);

export const LobbyId = createParamDecorator(
  (_, ctx: ExecutionContext) => extractSocketData(ctx).lobbyId
);

export const User = createParamDecorator(
  (_, ctx: ExecutionContext) => extractSocketData(ctx).user
);
