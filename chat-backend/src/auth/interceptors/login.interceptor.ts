import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Response } from 'express';
import { map, Observable, tap } from 'rxjs';

@Injectable()
export class LoginInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<{ email: string }>> {
    return next.handle().pipe(
      tap((body: any): void => {
        const res: Response = context.switchToHttp().getResponse();
        res.setHeader('Authorization', `Bearer ${body.access_token}`);
        res.cookie('access_token', body.access_token, {
          maxAge: 1000 * 60 * 60 * 24 * 7 /* 7 days */,
          httpOnly: true,
          sameSite: 'none',
          secure: true,
        });
      }),
      // delete body.access_token from response
      map(({ access_token, ...body }) => body),
    );
  }
}
