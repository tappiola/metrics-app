import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

const ERROR_MESSAGE_MAP = {
  [HttpStatus.BAD_REQUEST]: 'The server cannot or will not process the request',
  [HttpStatus.UNAUTHORIZED]:
    'The client must authenticate itself to get the requested response',
  [HttpStatus.FORBIDDEN]:
    'The client does not have access rights to the content',
  [HttpStatus.CONFLICT]:
    'The request conflicts with the current state of the server',
  [HttpStatus.NOT_FOUND]: 'The specified resource was not found',
  [HttpStatus.INTERNAL_SERVER_ERROR]:
    'The server has encountered a situation it does not know how to handle',
};

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    response.status(status).json({
      code: status,
      message:
        ERROR_MESSAGE_MAP[status] ??
        ERROR_MESSAGE_MAP[HttpStatus.INTERNAL_SERVER_ERROR],
    });
  }
}
