import { Logger, Injectable } from '@nestjs/common';
import { bufferCount, distinct, Subject } from 'rxjs';
import { QueueGateway } from './queue.gateway';
@Injectable()
export class QueueService {
  private logger = new Logger('QueueService');
  private queue: Subject<string> = new Subject<string>();
  private match: Subject<string[]> = new Subject<string[]>();

  constructor(private readonly queueGateway: QueueGateway) {
    this.queue.pipe(distinct(), bufferCount(2)).subscribe((players) => {
      this.logger.log(`Match found: ${players.join(', ')}`);
      // this.match.next(players);
      this.queueGateway.queueMatched(players);
      // this.queue.complete();
    });
  }

  joinQueue(player: string) {
    // console.log('#### p in queue');
    // this.queue.forEach((p) => {
    //   console.log(p);
    // });
    this.queue.next(player);
    // player already in queue?
  }

  getMatch() {
    return this.match.asObservable();
  }
}
