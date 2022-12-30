import { Module } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { User } from './user/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
// this is trash but... can recycle it later

const QueryRunnerFactory = {
  provide: 'QUERY_RUNNER',
  useFactory: (/* optionsProvider: OptionsProvider */) => {
    console.log('QUERY_RUNNER');

    return new DataSource({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User],
      synchronize: true,
    }).createQueryRunner();
  },
};

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [QueryRunnerFactory],
  exports: [QueryRunnerFactory],
})
export class QueryRunnerModule {}
