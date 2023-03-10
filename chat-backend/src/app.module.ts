import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { SocketModule } from './socket/socket.module';
import { PerformanceInterceptor } from './performance/performance.interceptor';
import { AuthModule } from './auth/auth.module';
import { ConfigurationModule } from './config/configuration.module';
import { ConfigurationService } from './config/configuration.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { QueueController } from './queue/queue.controller';
import { QueueService } from './queue/queue.service';
import { QueueGateway } from './queue/queue.gateway';
import { QueueModule } from './queue/queue.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '/../config/.development.env',
      isGlobal: true,
    }),
    UserModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigurationModule],
      useFactory: (configService: ConfigurationService) =>
        configService.postgresConfig,
      inject: [ConfigurationService],
    }),
    SocketModule,
    AuthModule,
    ConfigModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    QueueModule,
  ],
  controllers: [AppController, QueueController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: PerformanceInterceptor,
    },
    QueueService,
    QueueGateway,
  ],
})
export class AppModule {}
