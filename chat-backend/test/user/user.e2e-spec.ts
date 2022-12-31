import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { UserModule } from '../../src/user/user.module';
import * as request from 'supertest';
import { User } from '../../src/user/entities/user.entity';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { CreateUserDto } from '../../src/user/dto/create-user.dto';

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
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        UserModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'test',
          password: 'test',
          database: 'test',
          entities: [User],
          synchronize: true,
        }),
      ],
    })
      .overrideProvider(mockUserRepository)
      .useValue(mockUserRepositoryValue)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
  afterAll(async () => {
    await app.close();
  });
  it('/api/user (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/user')
      .expect(200)
      .expect(mockUserEmailArray);
  });
  it('/api/user (POST)', () => {
    return request(app.getHttpServer())
      .post('/api/user')
      .send(mockUserDto)
      .expect(201)
      .expect(mockUserDto);
  });
  it('/api/user/:id (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/user/1')
      .expect(200)
      .expect(mockUserDto);
  });
  it('/api/user/:id (DELETE)', () => {
    return request(app.getHttpServer())
      .delete('/api/user/1')
      .expect(200)
      .expect({ affected: 1 });
  });
});
