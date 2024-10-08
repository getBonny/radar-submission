import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfileModule } from '../profile/profile.module';
import { TransactionModule } from '../transaction/transaction.module';
import { ReferralService } from './referral.service';
import { Referral } from './referral.entity';

@Module({
  providers: [ReferralService],
  imports: [
    TypeOrmModule.forFeature([Referral]),
    ProfileModule,
    TransactionModule,
  ],
  exports: [ReferralService],
})
export class ReferralModule {}
