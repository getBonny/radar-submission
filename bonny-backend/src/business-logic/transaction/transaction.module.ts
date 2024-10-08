import { Module } from '@nestjs/common';
import { TransactionService as TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { DbModule } from 'src/db/database.module';

@Module({
  controllers: [TransactionController],
  providers: [TransactionService],
  imports: [DbModule],
  exports: [TransactionService],
})
export class TransactionModule {}
