import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { TransactionModule } from '../transaction/transaction.module';
import { ReferralService } from './referral.service';
import { ReferralController } from './referral.controller';
import { DbModule } from 'src/db/database.module';

@Module({
  controllers: [ReferralController],
  providers: [ReferralService],
  imports: [
    UserModule,
    TransactionModule,
    DbModule
  ],
  exports: [ReferralService],
})
export class ReferralModule {}
