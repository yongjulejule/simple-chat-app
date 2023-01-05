import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  UnauthorizedException,
} from '@nestjs/common';

@Catch(UnauthorizedException)
export class UnauthorizedFilter
  implements ExceptionFilter<UnauthorizedException>
{
  catch(exception: UnauthorizedException, host: ArgumentsHost) {
    // const ctx = host.switchToHttp();
    const response = host.switchToHttp().getResponse();
    const message = {
      error: 'invalid_token',
      error_description: 'The access token is invalid or not given',
    };
    response.set(
      'WWW-Authenticate',
      `Bearer realm="simple chat app" error="${message.error}",` +
        `error_description="${message.error_description}"`,
    );
    return response.status(401).json(message);
  }
}
