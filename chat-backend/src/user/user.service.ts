import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = new User();
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    if (!(await this.findOneByEmail(user.email))) {
      this.userRepository.save(user);
    } else {
      throw new ConflictException(user.email + ' already exists');
    }
    return 'user created : ' + user.email;
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find({
      select: { id: true, email: true },
    });
  }

  async findOne(id: number): Promise<User> {
    const ret = await this.userRepository.findOneBy({ id });
    return ret;
  }

  async findOneByEmail(email: string): Promise<User> {
    const ret: User = await this.userRepository.findOneBy({ email });
    return ret;
  }

  async remove(id: number) {
    // const { affected } = await this.userRepository.delete(id);
    const ret = await this.userRepository.delete(id);
    return ret;
  }
}
