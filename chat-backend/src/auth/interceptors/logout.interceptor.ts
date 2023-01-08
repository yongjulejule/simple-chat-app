import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LogoutInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<{ email: string }>> {
    return next.handle().pipe(
      tap((): void => {
        const res: Response = context.switchToHttp().getResponse();
        res.cookie('access_token', '', {
          maxAge: 0,
          httpOnly: true,
        });
      }),
    );
  }
}
