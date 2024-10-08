import { Module } from '@nestjs/common';
import { TransactionModule } from 'src/business-logic/transaction/transaction.module';
import { ProdegeController } from './prodege.controller';
import { ProdegeService } from './prodege.service';
import { DbModule } from 'src/db/database.module';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [ProdegeController],
  providers: [ProdegeService],
  imports: [TransactionModule, UserModule, DbModule],
})
export class ProdegeModule {}
