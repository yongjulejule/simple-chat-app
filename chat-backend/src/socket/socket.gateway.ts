import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
} from '@nestjs/websockets';
import { SocketService } from './socket.service';
import { UpdateSocketDto } from './dto/update-socket.dto';
import { ActiveUser } from './socket.interface';
import { Server, Socket } from 'socket.io';
import { UseInterceptors } from '@nestjs/common';
import { PerformanceInterceptor } from '../performance/performance.interceptor';
import { instrument } from '@socket.io/admin-ui';

@UseInterceptors(PerformanceInterceptor)
@WebSocketGateway({
  namespace: '/activity',
  cors: {
    // origin: 'http://localhost:3000',
    origin: '*',
  },
  credentials: true,
  // cookie: true,
})
export class SocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(private readonly socketService: SocketService) {
    this.activeUsers = new Set<ActiveUser>();
  }
  private activeUsers: Set<ActiveUser>;
  @WebSocketServer()
  private server: Server;

  handleConnection(@ConnectedSocket() client: Socket) {
    console.log(
      client.handshake.auth.email,
      ' is enter!\ncurrent active user : ',
      this.activeUsers,
    );
  }

  handleDisconnect(@ConnectedSocket() client: Socket) {
    // console.log('current Users: ', this.activeUsers);
    console.log(client.handshake.auth.email + ' :  disconnected');
    this.activeUsers.delete(client.handshake.auth.email);
    client.handshake.auth.email = '';
    console.log('current active user : ', this.activeUsers);
  }

  @SubscribeMessage('newConnection')
  newConnection(@ConnectedSocket() client: Socket) {
    console.log(client.handshake.auth);
    this.activeUsers.add(client.handshake.auth.email);
    console.log('current Users: ', this.activeUsers);
    // this.server.emit('clientHello', this.activeUsers);
    this.server.emit('clientHello', Array.from(this.activeUsers));
    // console.log(this.activeUsers);
  }

  // @SubscribeMessage('userConnected')
  // create(@MessageBody() createSocketDto: CreateSocketDto) {
  //   console.log('SocketGateway create, socket name: userConnected');
  //   console.log('clientHello', this.activeUsers);
  //   this.server.emit('clientHello', this.activeUsers);
  //   return this.socketService.create(createSocketDto);
  // }

  @SubscribeMessage('findAllSocket')
  findAll() {
    return this.socketService.findAll();
  }

  @SubscribeMessage('findOneSocket')
  findOne(@MessageBody() id: number) {
    return this.socketService.findOne(id);
  }

  @SubscribeMessage('updateSocket')
  update(@MessageBody() updateSocketDto: UpdateSocketDto) {
    return this.socketService.update(updateSocketDto.id, updateSocketDto);
  }

  @SubscribeMessage('removeSocket')
  remove(@MessageBody() id: number) {
    return this.socketService.remove(id);
  }
}
