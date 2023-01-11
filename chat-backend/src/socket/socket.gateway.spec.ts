import { Test, TestingModule } from '@nestjs/testing';
import { SocketGateway } from './socket.gateway';
import { SocketService } from './socket.service';
import * as Client from 'socket.io-client';

describe('SocketGateway', () => {
  let gateway: SocketGateway;
  let service: SocketService;
  let clientSocketManager: Client.Manager;
  let clientSocket: Client.Socket;
  let connectionSpy: jest.SpyInstance;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SocketGateway, SocketService],
    }).compile();

    gateway = module.get<SocketGateway>(SocketGateway);
    connectionSpy = jest.spyOn(gateway, 'handleConnection');
    service = module.get<SocketService>(SocketService);
    // clientSocketManager = new Client.Manager('http://localhost:4000/');
    // clientSocket = clientSocketManager.socket('/activity');
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
    expect(service).toBeDefined();
  });

  it('client connect to server', () => {
    const clientSocketManager = new Client.Manager('http://localhost:4000/', {
      autoConnect: false,
    });
    const clientSocket = clientSocketManager.socket('/activity').connect();
    clientSocket.emit('newConnection');

    // clientSocket.on('connect', () => {
    //   clientSocket.on('connected', (data) => {
    //     console.log('connected', data);
    //   });
    // });

    // expect(connectionSpy).toBeCalled();
  });
});
