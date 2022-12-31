import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserService } from '../user/user.service';
import { AuthController } from './auth.controller';
import { User } from '../user/entities/user.entity';
import { AuthService } from './auth.service';
import { Encrypter } from '../lib/encrypter';
import { JwtModule } from '@nestjs/jwt';
import { ConfigurationModule } from '../config/configuration.module';
import { ConfigurationService } from '../config/configuration.service';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;
  const mockUserRepository = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule.registerAsync({
          imports: [ConfigurationModule],
          useFactory: (configService: ConfigurationService) =>
            configService.authConfig,
          inject: [ConfigurationService],
        }),
      ],
      controllers: [AuthController],
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
        AuthService,
        Encrypter,
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
