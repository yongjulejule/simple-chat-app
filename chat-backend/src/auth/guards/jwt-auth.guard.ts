import {
  // ExecutionContext,
  Injectable,
  // UnauthorizedException,
} from '@nestjs/common';
// import { Socket } from 'socket.io';
import { AuthGuard } from '@nestjs/passport';
// import { Observable } from 'rxjs';
// import { WsException } from '@nestjs/websockets';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}

/**  NOTE : Guard is don't work on handleConnection || handleDisconnect. aw...
 @Injectable()
 export class SocketJwtAuthGuard extends AuthGuard('jwt') {
   canActivate(
     context: ExecutionContext,
   ): boolean | Promise<boolean> | Observable<boolean> {
     console.log('\n\n\n\nSocketJwtAuthGuard canActivate called\n\n\n\n');
     throw new WsException('Method not implemented.');
     return super.canActivate(context);
   }

   handleRequest(err, user, info, context: ExecutionContext) {
     console.log('JwtAuthGuard handleRequest called');
     const ws: Socket = context.switchToWs().getClient();

     // You can throw an exception based on either "info" or "err" arguments
     if (err || !user) {
       console.error(info);
       throw err || new UnauthorizedException();
     }

     return user;
   }
 }

*/
