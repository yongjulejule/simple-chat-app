import { Test, TestingModule } from '@nestjs/testing';
import { SocketGateway } from './socket.gateway';
import { SocketService } from './socket.service';
import * as Client from 'socket.io-client';

describe('SocketGateway', () => {
  let gateway: SocketGateway;
  let clientSocket: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SocketGateway, SocketService],
    }).compile();

    gateway = module.get<SocketGateway>(SocketGateway);
    clientSocket = Client.io('http://localhost:3000/activity');
  });

  afterAll(() => {
    clientSocket.disconnect();
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });

  it('client connect to server', () => {
    clientSocket.on('connect', () => {
      expect(clientSocket.connected).toBeTruthy();
    });
  });
});
