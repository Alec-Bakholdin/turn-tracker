import { UserDto } from './user';

export interface AuthDto {
  authToken: string;
  user: UserDto;
}

export default AuthDto;

export const USER_UPDATE_EVENT = 'userUpdate';
