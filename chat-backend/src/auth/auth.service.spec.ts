import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user/user.service';
import { Encrypter } from '../lib/encrypter';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { UserModule } from '../user/user.module';
import { User } from '../user/entities/user.entity';
import {
  getDataSourceToken,
  getRepositoryToken,
  TypeOrmModule,
} from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigurationModule } from '../config/configuration.module';
import { ConfigurationService } from '../config/configuration.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { Repository } from 'typeorm';

const userRepositoryMock = {};
describe('AuthService', () => {
  let service: AuthService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        UserModule,
        PassportModule,
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: './config/.test.env',
        }),
        ConfigurationModule,
        JwtModule.registerAsync({
          imports: [ConfigurationModule],
          useFactory: (configService: ConfigurationService) =>
            configService.authConfig,
          inject: [ConfigurationService],
        }),
        TypeOrmModule.forRootAsync({
          imports: [ConfigurationModule],
          useFactory: (configService: ConfigurationService) =>
            configService.postgresConfig,
          inject: [ConfigurationService],
        }),
      ],
      providers: [
        UserService,
        ConfigService,
        AuthService,
        LocalStrategy,
        JwtStrategy,
        Encrypter,
        {
          provide: getRepositoryToken(User),
          useValue: userRepositoryMock,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
