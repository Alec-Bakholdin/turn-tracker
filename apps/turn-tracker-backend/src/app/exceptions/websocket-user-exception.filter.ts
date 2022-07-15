import { ArgumentsHost, Catch, WsExceptionFilter } from '@nestjs/common';
import UserException from './UserException';
import { Socket } from 'socket.io';
import {
  ERROR_EVENT_TYPE,
  ErrorDto,
} from '@turn-tracker-nx-nestjs-react/turn-tracker-types';

@Catch(UserException)
export class WebsocketUserExceptionFilter
  implements WsExceptionFilter<UserException>
{
  catch(exception: UserException, host: ArgumentsHost): any {
    const socket = host.switchToWs().getClient<Socket>();
    const errorDto = { message: exception.message, type: 'user' } as ErrorDto;
    socket.emit(ERROR_EVENT_TYPE, errorDto);
  }
}
