import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LitService } from './lit.service';

@Module({
  imports: [ConfigModule],
  providers: [LitService],
  exports: [LitService],
})
export class LitModule {}