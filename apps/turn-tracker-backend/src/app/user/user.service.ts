import { Injectable } from '@nestjs/common';
import { User } from '@turn-tracker-nx-nestjs-react/turn-tracker-types';
import { randomUUID } from 'crypto';

@Injectable()
export class UserService {
  newUser(name?: string): User {
    return {
      id: randomUUID(),
      name,
    };
  }
}
