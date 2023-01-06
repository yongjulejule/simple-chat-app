import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
  ConnectedSocket,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { SocketService } from './socket.service';
import { UpdateSocketDto } from './dto/update-socket.dto';
import { ActiveUser } from './socket.interface';
import { Server, Socket } from 'socket.io';
import { BadRequestException, UseInterceptors } from '@nestjs/common';
import { PerformanceInterceptor } from '../performance/performance.interceptor';

@UseInterceptors(PerformanceInterceptor)
@WebSocketGateway({
  // transport: ['websocket'],
  namespace: '/activity',
  cors: {
    origin: 'http://localhost:3000',
    // origin: 'http(s)://(localhost:3000|admin.socket.io)',
    // origin: '*',
  },
  // credentials: true,
  // cookie: true,
})
export class SocketGateway /* implements OnGatewayConnection  */ {
  constructor(private readonly socketService: SocketService) {
    this.activeUsers = [];
  }
  private activeUsers: ActiveUser[];
  @WebSocketServer()
  private server: Server;

  handleConnection(@ConnectedSocket() client: Socket, ...args: any[]) {
    // this.server.emit('connected', 'connection ( check who connected )');
    // this.server.emit('user connected', 'user connected');
    console.log('handleConnection end');
  }

  // handleDisconnection(@ConnectedSocket() client: any, ...args: any[]) {
  //   // console.log('current Users: ', this.activeUsers);
  //   this.server.emit(
  //     'disconnected',
  //     'disconnection ( check who disconnected )',
  //   );
  // }

  @SubscribeMessage('newConnection')
  newConnection(
    @ConnectedSocket() client: any,
    @MessageBody() data: ActiveUser,
  ) {
    console.log(
      'handshake cookie in newConnection :',
      // client.handshake.headers.cookie,
    );
    if (data === undefined || data === null) {
      throw new BadRequestException('data is undefined or null');
    }
    console.log(data);
    this.activeUsers.push(data);
    // this.server.emit('clientHello', this.activeUsers);
    this.server.emit('clientHello', this.activeUsers);
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
