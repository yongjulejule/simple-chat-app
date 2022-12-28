import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class PerformanceInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('before ... ');

    const now = Date.now();
    return next
      .handle()
      .pipe(tap(() => console.log(`after ... ${Date.now() - now}ms`)));
  }
}
