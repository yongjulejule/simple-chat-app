import { Module, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Encrypter } from 'src/lib/encrypter';
import { DataSource } from 'typeorm';
import { QueryRunnerFactory } from 'src/querry-runner.factory';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, Encrypter /* , QueryRunnerFactory */],
})
export class UserModule {}
