import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { instrument } from '@socket.io/admin-ui';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MonitorGateway {
  // ...
  @WebSocketServer()
  server: Server;
  afterInit() {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    instrument(this.server, {
      auth: false,
      mode: 'development',
      // namespaceName: '/activity',
    });
  }
}
