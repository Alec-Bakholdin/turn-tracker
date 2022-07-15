import { Body, Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';
import {
  AuthDto,
  UserDto,
} from '@turn-tracker-nx-nestjs-react/turn-tracker-types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  login(@Req() request: Request): AuthDto {
    const authToken = request.headers.authorization;
    return this.authService.login(authToken);
  }

  @Post('newToken')
  newToken(@Req() request: Request, @Body() body: Partial<UserDto>): AuthDto {
    const authToken = request.headers.authorization;
    return this.authService.newToken(body, authToken);
  }
}
