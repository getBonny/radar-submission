import { Module } from '@nestjs/common';
import { ReceiptDataService } from './receiptdata.service';
import { ConfigModule } from '@nestjs/config';
import { TransactionModule } from 'src/business-logic/transaction/transaction.module';
import { ReceiptModule } from 'src/business-logic/receipt/receipt.module';
import { CouponModule } from 'src/business-logic/coupons/coupons.module';
import { StatsModule } from 'src/business-logic/stats/stats.module';
import { ReferralModule } from 'src/business-logic/referral/referral.module';
import { UserModule } from 'src/business-logic/user/user.module';
import { SupabaseModule } from '../supabase/supabase.module';
import { LitModule } from '../lit/lit.module';

@Module({
  providers: [ReceiptDataService],
  imports: [
    TransactionModule,
    UserModule,
    ReceiptModule,
    CouponModule,
    StatsModule,
    ConfigModule,
    ReferralModule,
    SupabaseModule,
    LitModule
  ],
})
export class ReceiptDataModule {}
