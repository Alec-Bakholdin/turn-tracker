import { UserDto } from './user-dto';

export default interface AuthDto {
  authToken: string;
  user: UserDto;
}

export const USER_UPDATE_EVENT = 'userUpdate';
