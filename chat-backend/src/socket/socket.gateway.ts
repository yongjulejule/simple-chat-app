import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer } from '@nestjs/websockets';
import { SocketService } from './socket.service';
import { CreateSocketDto } from './dto/create-socket.dto';
import { UpdateSocketDto } from './dto/update-socket.dto';
import { ActiveUser } from './socket.interface';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } })
export class SocketGateway {
	constructor(private readonly socketService: SocketService) {
		console.log('SocketGateway constructor')
		this.activeUsers = [];
	}
	private activeUsers: ActiveUser[]
	@WebSocketServer()
	server: Server;

	handleConnection(client: any, ...args: any[]) {
		console.log(args);
		console.log('SocketGateway handleConnection')
		// this.server.emit('user connected', 'user connected')
	}

	@SubscribeMessage('newConnection')
	newConnection(@MessageBody() data: ActiveUser) {
		console.log("SocketGateway newConnection", data)
		this.activeUsers.push(data);
		this.server.broadcast.emit('newConnection', data)
		console.log(this.activeUsers)
	}

	@SubscribeMessage('userConnected')
	create(@MessageBody() createSocketDto: CreateSocketDto) {
		console.log("SocketGateway create", createSocketDto)
		return this.socketService.create(createSocketDto);
	}

	@SubscribeMessage('ping')
	ping(@MessageBody() data: any) {
		console.log("SocketGateway ping", data)
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
