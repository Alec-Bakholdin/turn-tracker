import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { SocketData } from './auth/auth.gateway';

const extractSocketData = (ctx: ExecutionContext): SocketData =>
  ctx.switchToWs().getData<SocketData>();

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
