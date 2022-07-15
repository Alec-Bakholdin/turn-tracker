import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import {
  AuthDto,
  UserDto,
} from '@turn-tracker-nx-nestjs-react/turn-tracker-types';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService
  ) {}

  newToken(userDto: Partial<UserDto>, authToken?: string): AuthDto {
    const authUser = this.decodeOrThrow(authToken);
    if (userDto.id && userDto.id !== authUser.id) {
      throw new UnauthorizedException('User id cannot be changed');
    }
    return this.signUser({ ...authUser, ...userDto });
  }

  login(authToken: string): AuthDto {
    let user = this.jwtService.decode(authToken) as UserDto;
    if (!user?.id) {
      user = this.userService.newUser();
    }
    return this.signUser(user);
  }

  private signUser(user: UserDto) {
    return {
      authToken: this.jwtService.sign(user),
      user,
    };
  }

  decodeOrThrow(authToken?: string): UserDto {
    if (!authToken) {
      throw new UnauthorizedException('Empty authorization token');
    }
    const user = this.jwtService.decode(authToken) as UserDto;
    if (!user?.id) {
      throw new UnauthorizedException('Invalid authorization token');
    }
    return user;
  }
}
