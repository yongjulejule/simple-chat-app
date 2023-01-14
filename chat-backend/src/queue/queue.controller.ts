import { Controller, Get, Post } from '@nestjs/common';
import { QueueService } from './queue.service';

@Controller('queue')
export class QueueController {
  constructor(private readonly queueService: QueueService) {}

  @Post('new')
  create() {
    return this.queueService.create();
  }

  @Get()
  match() {
    return this.queueService.match();
  }
}
