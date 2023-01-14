import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

@Injectable()
export class ConfigurationService {
  constructor(private configService: ConfigService) {
    console.log(
      '==========',
      this.configService.get('NODE_ENV'),
      this.configService.get('DB_HOST'),
      '==============',
    );
  }

  get postgresConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get('DB_HOST'),
      port: this.configService.get('DB_PORT'),
      username: this.configService.get('DB_USERNAME'),
      password: this.configService.get('DB_PASSWORD'),
      database: this.configService.get('DB_NAME'),
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: true,
    };
  }

  get authConfig() {
    return {
      secret: this.configService.get('JWT_SECRET') || 'hi',
      signOptions: { expiresIn: '24h' },
    };
  }
}
