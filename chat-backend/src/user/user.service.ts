import { Injectable, UseInterceptors } from '@nestjs/common';
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

		const queryRunner = this.dataSource.createQueryRunner();
		await queryRunner.connect();
		await queryRunner.startTransaction();

		let SUCCESS = true;
		try {
			await queryRunner.connection.manager.save(user);
			await queryRunner.commitTransaction();
		} catch (err) {
			await queryRunner.rollbackTransaction();
			SUCCESS = false;
		} finally {
			await queryRunner.release();
		}
		return SUCCESS
	}

	findAll(): Promise<User[]> {
		return this.userRepository.find();
	}

	findOne(id: number): Promise<User> {
		return this.userRepository.findOneBy({ id });
	}

	async remove(id: number) {
		const { affected } = await this.userRepository.delete(id);
		return affected > 0 ? { message: 'User deleted successfully' } : { message: 'User not found' }
	}
	private async validateUser(email: string) {
		const user = await this.userRepository.findOneBy({ email });
		return user;
	}
}
