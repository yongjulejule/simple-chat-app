import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { UserModule } from '../../src/user/user.module';
import * as request from 'supertest';
import { User } from '../../src/user/entities/user.entity';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { CreateUserDto } from '../../src/user/dto/create-user.dto';
import { AppModule } from '../../src/app.module';

const userDtoArray: CreateUserDto[] = [
  {
    email: 'email_1@example.com',
    password: 'password_1',
  },
  {
    email: 'email_2@example.com',
    password: 'password_2',
  },
];

const emailArray = userDtoArray.map((userDto) => userDto.email);

const userDto: CreateUserDto = {
  email: 'email_3@example.com',
  password: 'password_3',
};

describe('UserModule (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        UserModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          // username: 'yongjule' ,
          // password: 'yongjule' ,
          // database: 'yongjule' ,
          entities: [User],
          synchronize: true,
        }),
      ],
      providers: [
        {
          provide: getRepositoryToken(User),
          useValue: {
            findAll: jest.fn().mockResolvedValue(userDtoArray),
            findOneBy: jest.fn().mockResolvedValue(userDto),
            findOne: jest.fn().mockResolvedValue(userDto),
            find: jest.fn().mockResolvedValue(emailArray),
            save: jest.fn().mockResolvedValue(userDto),
            delete: jest.fn().mockResolvedValue({ affected: 1 }),
          },
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });
  it('/api/user (GET)', () => {
    return request(app.getHttpServer())
      .get('/api/user')
      .expect(200)
      .expect(userDtoArray);
  });
});
