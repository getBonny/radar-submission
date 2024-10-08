import { Module } from '@nestjs/common';
import { QuestService } from './quest.service';
import { TransactionModule } from '../transaction/transaction.module';
import { StatsModule } from '../stats/stats.module';
import { QuestController } from './quest.controller';
import { DbModule } from 'src/db/database.module';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [QuestController],
  providers: [QuestService],
  imports: [
    UserModule,
    TransactionModule,
    StatsModule,
    DbModule
  ],
  exports: [QuestService],
})
export class QuestModule {}
