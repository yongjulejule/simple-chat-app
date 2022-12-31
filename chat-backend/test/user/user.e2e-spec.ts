import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { UserModule } from '../../src/user/user.module';
import * as request from 'supertest';
import { User } from '../../src/user/entities/user.entity';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { CreateUserDto } from '../../src/user/dto/create-user.dto';
import { AuthModule } from '../../src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ConfigurationModule } from '../../src/config/configuration.module';
import { ConfigurationService } from '../../src/config/configuration.service';
import { JwtModule } from '@nestjs/jwt';
import { Encrypter } from '../../src/lib/encrypter';

const mockUserDtoArray: CreateUserDto[] = [
  {
    email: 'email_1@example.com',
    password: 'password_1',
  },
  {
    email: 'email_2@example.com',
    password: 'password_2',
  },
];

const mockUserEmailArray = mockUserDtoArray.map((userDto) => userDto.email);

const mockUserDto: CreateUserDto = {
  email: 'email_3@example.com',
  password: 'password_3',
};

describe('UserModule (e2e)', () => {
  let app: INestApplication;

  // Mocking Database
  const mockUserRepository = getRepositoryToken(User);
  const mockUserRepositoryValue = {
    findAll: jest.fn().mockResolvedValue(mockUserEmailArray),
    findOneBy: jest.fn().mockResolvedValue(mockUserDto),
    findOne: jest.fn().mockResolvedValue(mockUserDto),
    find: jest.fn().mockResolvedValue(mockUserEmailArray),
    save: jest.fn().mockResolvedValue(mockUserDto),
    delete: jest.fn().mockResolvedValue({ affected: 1 }),
  };

  const mockEncrypter = {
    hashPassword: jest.fn().mockResolvedValue('hashedPassword'),
    comparePassword: jest.fn().mockResolvedValue(true),
  };
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigurationModule,
        UserModule,
        AuthModule,
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: './config/.test.env',
        }),
        JwtModule.registerAsync({
          imports: [ConfigurationModule],
          useFactory: async (configService: ConfigurationService) => ({
            secret: 'testsSecret',
            signOptions: { expiresIn: '60s' },
          }),
        }),
      ],
      providers: [ConfigurationService],
    })
      .overrideProvider(mockUserRepository)
      .useValue(mockUserRepositoryValue)
      .overrideProvider(Encrypter)
      .useValue(mockEncrypter)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/api/user (POST)', async () => {
    const req = await request(app.getHttpServer())
      .post('/api/user')
      .send(mockUserDto)
      .expect(201);
  });

  let token: string;

  it('/auth/login (POST)', async () => {
    const req = await request(app.getHttpServer())
      .post('/auth/login')
      .send(mockUserDto)
      .expect(200);
    token = req.headers['authorization'].split(' ')[1];
  });

  it('/api/user (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/user')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect(mockUserEmailArray);
  });
  it('/api/user/:id (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/user/1')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect(mockUserDto);
  });
  it('/api/user/:id (DELETE)', () => {
    return request(app.getHttpServer())
      .delete('/api/user/1')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect({ affected: 1 });
  });

  it('/auth/logout (POST)', () => {
    return request(app.getHttpServer())
      .post('/auth/logout')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect({ message: 'Logout success' });
  });
});
