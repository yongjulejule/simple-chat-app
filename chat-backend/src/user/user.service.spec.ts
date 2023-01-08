import { Test, TestingModule } from '@nestjs/testing';
import { getDataSourceToken, getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';

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

const newUserDto = {
  email: 'new email',
  password: 'new password',
};

describe('UserService', () => {
  let service: UserService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findAll: jest.fn().mockResolvedValue(userDtoArray),
            findOneBy: jest.fn().mockResolvedValue(userDto),
            findOne: jest.fn().mockResolvedValue(userDto),
            find: jest.fn().mockResolvedValue(emailArray),
            save: jest.fn().mockResolvedValue(newUserDto),
            delete: jest.fn().mockResolvedValue({ affected: 1 }),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users = await service.findAll();
      expect(users).toEqual(emailArray);
    });
  });

  describe('findOne()', () => {
    it('should get a single user', async () => {
      const id = 1;
      const ret = await service.findOne(id);
      expect(repository.findOneBy).toHaveBeenCalledWith({ id: id });
      expect(ret).toEqual(userDto);
    });
  });

  describe('create()', () => {
    it('should create a user', async () => {
      jest.spyOn(service, 'findOneByEmail').mockResolvedValue(null);
      const user = await service.create(newUserDto);
      console.log(user);
      expect(user).toEqual('user created : ' + newUserDto.email);
    });
  });

  describe('remove()', () => {
    it('shoud be delete a user', async () => {
      const id = 1;
      const user = await service.remove(id);
      expect(repository.delete).toHaveBeenCalledWith(id);
      expect(user).toEqual({ affected: 1 });
    });
  });
});
