import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ConfigurationService } from './configuration.service';

@Module({
  providers: [ConfigurationService, ConfigService],
  exports: [ConfigurationService],
})
export class ConfigurationModule {}
