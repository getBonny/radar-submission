import { Module } from '@nestjs/common';
import { dbService } from './database.service';

@Module({
  providers: [dbService],
  exports: [dbService],
})
export class DbModule {}
