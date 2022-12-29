import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { User } from './user/entities/user.entity';
import { ConfigModule } from '@nestjs/config';
import { SocketModule } from './socket/socket.module';
import { PerformanceInterceptor } from './performance/performance.interceptor';
import { QueryRunnerFactory } from './querry-runner.factory';

@Module({
  imports: [
    UserModule,
    // TODO :  extract argument of TypeOrmModule.forRoot() to one object
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User],
      synchronize: true,
    }),

    // TypeOrmModule.forRootAsync({
    //   // Use useFactory, useClass, or useExisting
    //   // to configure the DataSourceOptions.
    //   useFactory: () => ({
    //     type: 'postgres',
    //     host: 'localhost',
    //     port: 5432,
    //     username: process.env.DB_USERNAME,
    //     password: process.env.DB_PASSWORD,
    //     database: process.env.DB_NAME,
    //     entities: [User],
    //     synchronize: true,
    //   }),
    //   // dataSource receives the configured DataSourceOptions
    //   // and returns a Promise<DataSource>.
    //   dataSourceFactory: async (options) => {
    //     const dataSource = await new DataSource(options).initialize();
    //     return dataSource;
    //   },
    // }),

    ConfigModule.forRoot({ envFilePath: './config/.development.env' }),
    SocketModule,
  ],
  controllers: [AppController],
  providers: [
    /* QueryRunnerFactory, */
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: PerformanceInterceptor,
    },
  ],
  // exports: [QueryRunnerFactory],
})
export class AppModule {
  // constructor(@Inject(QueryRunnerFactory) private readonly queryRunner) {}
}
