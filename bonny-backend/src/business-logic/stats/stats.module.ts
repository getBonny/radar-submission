import { Module } from '@nestjs/common';
import { StatsService } from './stats.service';
import { StatisticsController } from './statistics.controller';
import { DbModule } from 'src/db/database.module';

@Module({
  controllers: [StatisticsController],
  providers: [StatsService],
  imports: [DbModule],
  exports: [StatsService],
})
export class StatsModule {}
