import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { FirebaseAuthGuard } from 'src/firebase/firebase-auth.guard';
import { BotService } from './bot.service';

@Controller('verify')
export class BotController {
  constructor(private botService: BotService) {}

  @Post()
  async verifyUser(
    @Body("publicKey") publicKey: string,
    @Body("token") token: string,
    @Body("tokenType") tokenType: string
  ) {
    await this.botService.verifyUser(publicKey, token, tokenType)
  }
}
