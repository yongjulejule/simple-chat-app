import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';
import { ConfigurationModule } from '../config/configuration.module';
import { ConfigurationService } from '../config/configuration.service';
import { Encrypter } from '../lib/encrypter';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigurationModule],
      useFactory: (configService: ConfigurationService) =>
        configService.authConfig,
      inject: [ConfigurationService],
    }),
    ConfigurationModule,
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, Encrypter],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
