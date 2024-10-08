import { Module } from '@nestjs/common';
import { ReceiptDataService } from './receiptdata.service';
import { TransactionModule } from 'src/model/transaction/transaction.module';
import { ProfileModule } from 'src/model/profile/profile.module';
import { ReceiptModule } from 'src/model/receipt/receipt.module';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { CouponModule } from 'src/model/coupons/coupons.module';
import { StatsModule } from 'src/model/stats/stats.module';
import { ConfigModule } from '@nestjs/config';
import { ReferralModule } from 'src/model/referral/referral.module';

@Module({
  providers: [ReceiptDataService],
  imports: [
    TransactionModule,
    ProfileModule,
    ReceiptModule,
    FirebaseModule,
    CouponModule,
    StatsModule,
    ConfigModule,
    ReferralModule,
  ],
})
export class ReceiptDataModule {}
