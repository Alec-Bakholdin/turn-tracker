import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ExceptionsModule } from './exceptions/exceptions.module';
import { AuthController } from './auth/auth.controller';
import { UserService } from './user/user.service';
import { AuthService } from './auth/auth.service';
import { AuthGateway } from './auth/auth.gateway';
import { LobbyGateway } from './lobby/lobby.gateway';
import { LobbyService } from './lobby/lobby.service';

@Module({
  imports: [
    JwtModule.register({ secret: process.env['NX_JWT_SECRET'] }),
    ExceptionsModule,
  ],
  controllers: [AuthController],
  providers: [
    UserService,
    AuthService,
    AuthGateway,
    LobbyService,
    LobbyGateway,
  ],
})
export class AppModule {}
