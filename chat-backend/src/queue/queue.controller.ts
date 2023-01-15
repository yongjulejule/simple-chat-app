import { Controller, Get, Logger, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { QueueGateway } from './queue.gateway';
import { QueueService } from './queue.service';

@Controller('queue')
export class QueueController {
  private logger = new Logger('QueueController');
  constructor(
    private readonly queueService: QueueService,
    private queueGateway: QueueGateway,
  ) {
    // this.queueService.getMatch().subscribe((players) => {
    //   this.logger.log(`Match found: ${players.join(', ')}`);
    //   this.queueGateway.queueMatched(players);
    // });
  }

  @Post('new')
  @UseGuards(JwtAuthGuard)
  joinQueue(@Req() req: Request) {
    const player: any = req.user;
    this.logger.log(`Player ${player.email} request join the queue`);
    this.queueService.joinQueue(player.email);
    return { email: player.email, message: 'Player joined the queue' };
  }

  // @Get()
  // getMatch() {
  //   this.logger.log('Match found');
  //   return this.queueService.getMatch();
  //   // return { message: 'Match found' };
  // }
}
