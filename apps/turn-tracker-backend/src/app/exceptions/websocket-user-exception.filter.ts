import { ArgumentsHost, Catch, WsExceptionFilter } from '@nestjs/common';
import { UserException } from './user-exception';
import { Socket } from 'socket.io';
import {
  ERROR_EVENT_TYPE,
  ErrorDto,
} from '@turn-tracker-nx-nestjs-react/turn-tracker-types';

@Catch(UserException)
export class WebsocketUserExceptionFilter
  implements WsExceptionFilter<UserException>
{
  catch(exception: UserException, host: ArgumentsHost) {
    const socket = host.switchToWs().getClient<Socket>();
    const errorDto = {
      type: exception.type,
      message: exception.message,
    } as ErrorDto;
    socket.emit(ERROR_EVENT_TYPE, errorDto);
  }
}
