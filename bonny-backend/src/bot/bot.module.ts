import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { DiscordService } from './discord.service';
import { BotController } from './bot.controller';

@Module({
  controllers: [BotController],
  providers: [BotService, DiscordService],
  imports: [],
})
export class BotModule {}
