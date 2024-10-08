import { Controller, Get } from '@nestjs/common';
import { StatsService } from 'src/business-logic/stats/stats.service';

@Controller('stats')
export class StatisticsController {
  constructor(private statsService: StatsService) {}

  @Get()
  async getStats() {
    return await this.statsService.get();
  }

  @Get('user')
  async getUserStats() {
    return await this.statsService.getUserStats();
  }

}
