import { Module } from '@nestjs/common';
import { TelegrafService } from './telegraf.service';

@Module({
  controllers: [],
  providers: [TelegrafService],
  imports: [],
})
export class TelegrafModule {}
