import { Module } from '@nestjs/common';
import { SocketService } from './socket.service';
import { SocketGateway } from './socket.gateway';

@Module({
	providers: [SocketGateway, SocketService],
	exports: [SocketGateway, SocketService],
})
export class SocketModule { }
