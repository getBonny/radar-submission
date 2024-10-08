import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { ProfileModule } from 'src/model/profile/profile.module';
import { StatsModule } from 'src/model/stats/stats.module';
import { ReferralModule } from 'src/model/referral/referral.module';

@Module({
  controllers: [UserController],
  providers: [],
  imports: [ProfileModule, StatsModule, ReferralModule],
})
export class UserModule {}
