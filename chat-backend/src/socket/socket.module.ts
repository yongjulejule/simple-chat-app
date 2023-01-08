import { Module } from '@nestjs/common';
import { SocketService } from './socket.service';
import { SocketGateway } from './socket.gateway';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [SocketGateway, SocketService, JwtService],
  exports: [SocketGateway, SocketService],
})
export class SocketModule {}
