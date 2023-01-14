import { Injectable } from '@nestjs/common';
import { queueScheduler } from 'rxjs';
import { QueueScheduler } from 'rxjs/internal/scheduler/QueueScheduler';

@Injectable()
export class QueueService {
  constructor() {
    this.queue = queueScheduler;
  }
  private queue: QueueScheduler;
  create() {
    // create a new queue by rxjs

    return 'This action adds a new queue';
  }

  match() {
    // match a queue by rxjs

    return 'This action matches a queue';
  }
}
