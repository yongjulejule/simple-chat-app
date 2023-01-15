import { Injectable } from '@nestjs/common';
import {
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@Injectable()
@WebSocketGateway({
  namespace: 'queue',
  cors: 'http://localhost:3000',
})
export class QueueGateway implements OnGatewayConnection {
  @WebSocketServer()
  private server: Server;

  handleConnection(client: Socket) {
    console.log('client connected');
  }

  queueMatched(players: string[]) {
    this.server.emit('queueMatched', players);
  }
}
