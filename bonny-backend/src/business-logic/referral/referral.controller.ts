import { Body, Controller, Post } from '@nestjs/common';
import { ReferralService } from './referral.service';

@Controller('referral')
export class ReferralController {
  constructor(private referralService: ReferralService) {}

  @Post()
  async addReferrer(
    @Body('referrerUsername') referrerUsername: string,
    @Body('userId') userId: string,
  ) {
    await this.referralService.addReferrer(userId, referrerUsername);
  }
}
