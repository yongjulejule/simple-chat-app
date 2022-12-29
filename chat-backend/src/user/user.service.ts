import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  private userRepository: Repository<User>;
  constructor(
    @InjectDataSource() private dataSource: DataSource, // private dataSource: DataSource,
  ) {
    this.userRepository = dataSource.getRepository(User);
  }

  async create(createUserDto: CreateUserDto) {
    const user = new User();
    user.email = createUserDto.email;
    user.password = createUserDto.password;
    // Transaction Example
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    let ret: User | void;
    try {
      ret = await queryRunner.connection.manager.save(user);
      await queryRunner.commitTransaction();
    } catch (err) {
      ret = await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
    return ret;

    // return this.userRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find({
      select: { email: true },
    });
  }

  async findOne(id: number): Promise<User> {
    const ret = await this.userRepository.findOneBy({ id });
    console.log(ret);
    return ret;
    // return this.userRepository.findOneBy({ id });
  }

  async remove(id: number) {
    // const { affected } = await this.userRepository.delete(id);
    const ret = await this.userRepository.delete(id);
    console.log(ret);
    return ret;
    // return affected > 0
    //   ? { message: 'User deleted successfully' }
    //   : { message: 'User not found' };
  }
  private async validateUser(email: string) {
    const user = await this.userRepository.findOneBy({ email });
    return user;
  }
}
