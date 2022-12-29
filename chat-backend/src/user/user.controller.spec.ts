import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { getDataSourceToken, getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { ValidationPipe } from '@nestjs/common';
import { Encrypter } from '../lib/encrypter';

const userDtoArray: CreateUserDto[] = [
  {
    email: 'email #1',
    password: 'password #1',
  },
  {
    email: 'email #2',
    password: 'password #2',
  },
];
const emailArray = userDtoArray.map((userDto) => userDto.email);

const userDto = {
  email: 'email #1',
  password: 'password #1',
};

class mockDataSource {}
describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        ValidationPipe,
        Encrypter,
        UserService,
        {
          provide: getDataSourceToken(),
          useClass: mockDataSource,
        },
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

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // describe('create() method', () => {
  //   it('should return a user', async () => {
  //     const user = await controller.create();
  //     expect(user).toEqual(user);
  //   });
  // }
});
