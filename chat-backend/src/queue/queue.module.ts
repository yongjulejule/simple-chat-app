import { Module } from '@nestjs/common';
import { QueueController } from './queue.controller';
import { QueueGateway } from './queue.gateway';
import { QueueService } from './queue.service';

@Module({
  controllers: [QueueController],
  providers: [QueueService, QueueGateway],
})
export class QueueModule {}
