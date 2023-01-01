import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  WebSocketServer,
} from '@nestjs/websockets';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SocketService } from './socket.service';
import { CreateSocketDto } from './dto/create-socket.dto';
import { UpdateSocketDto } from './dto/update-socket.dto';
import { ActiveUser } from './socket.interface';
import { Server } from 'socket.io';
import { UseInterceptors } from '@nestjs/common';
import { PerformanceInterceptor } from '../performance/performance.interceptor';

@UseInterceptors(PerformanceInterceptor)
@WebSocketGateway({ namespace: '/activity', cors: { origin: '*' } })
export class SocketGateway {
  constructor(private readonly socketService: SocketService) {
    this.activeUsers = [];
  }
  private activeUsers: ActiveUser[];
  @WebSocketServer()
  server: Server;

  handleConnection(client: any, ...args: any[]) {
    console.log('SocketGateway handleConnection');
    console.log('current Users: ', this.activeUsers);
    console.log('client', client);
    console.log('args', args);
    this.server.emit('connected', 'connection ( check who connected )');
    // this.server.emit('user connected', 'user connected')
  }

  handleDisconnection(client: any, ...args: any[]) {
    console.log('SocketGateway handleDisconnection');
    console.log('current Users: ', this.activeUsers);
    console.log('client', client);
    console.log('args', args);
    this.server.emit(
      'disconnected',
      'disconnection ( check who disconnected )',
    );
    // this.server.emit('user disconnected', 'user disconnected')
  }

  @SubscribeMessage('newConnection')
  newConnection(@MessageBody() data: ActiveUser) {
    console.log('SocketGateway newConnection', data);
    this.activeUsers.push(data);
    this.server.emit('clientHello', this.activeUsers);
    console.log(this.activeUsers);
  }

  // @SubscribeMessage('userConnected')
  // create(@MessageBody() createSocketDto: CreateSocketDto) {
  //   console.log('SocketGateway create, socket name: userConnected');
  //   console.log('clientHello', this.activeUsers);
  //   this.server.emit('clientHello', this.activeUsers);
  //   return this.socketService.create(createSocketDto);
  // }

  @SubscribeMessage('ping')
  ping(@MessageBody() data: any) {
    console.log('SocketGateway ping', data);
  }

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
