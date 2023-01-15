import { Injectable, Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
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
export class QueueGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  private server: Server;
  private chatId: number;
  private readonly logger = new Logger(QueueGateway.name);
  constructor() {
    this.chatId = 1;
  }

  handleConnection(client: Socket) {
    this.logger.log('client connected');
  }

  handleDisconnect(client: Socket) {
    this.logger.log('client disconnected');
  }

  @SubscribeMessage('joinQueue')
  joinQueue(@ConnectedSocket() client: Socket, @MessageBody() email: string) {
    this.logger.log('client email : ' + email);
    this.logger.log('player joined queue numbered: ' + this.chatId);
    client.join('chat-' + this.chatId);
  }

  @SubscribeMessage('leaveQueue')
  leaveQueue(@ConnectedSocket() client: Socket) {
    this.logger.log('player left queue numbered: ' + this.chatId);
    client.leave('chat-' + this.chatId);
  }

  queueMatched(players: string[]) {
    this.server.to('chat-' + this.chatId).emit('queueMatched', this.chatId);
    const adapter: any = this.server.adapter;
    console.log(adapter.rooms);
    this.chatId++;
  }
}
