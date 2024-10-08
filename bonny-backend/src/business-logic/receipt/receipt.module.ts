import { Module } from '@nestjs/common';
import { ReceiptService } from './receipt.service';
import { DbModule } from 'src/db/database.module';
import { ReceiptController } from './receipt.controller';

@Module({
  controllers: [ReceiptController],
  providers: [ReceiptService],
  exports: [ReceiptService],
  imports: [DbModule]
})
export class ReceiptModule {}
