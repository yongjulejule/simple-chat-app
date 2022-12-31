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

class mockUserRepository {}
describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        UserService,
        Encrypter,
        {
          provide: getRepositoryToken(User),
          useClass: mockUserRepository,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
