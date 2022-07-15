import { Injectable } from '@nestjs/common';
import { UserDto } from '@turn-tracker-nx-nestjs-react/turn-tracker-types';
import { randomUUID } from 'crypto';

@Injectable()
export class UserService {
  newUser(name?: string): UserDto {
    return {
      id: randomUUID(),
      name,
    };
  }
}
