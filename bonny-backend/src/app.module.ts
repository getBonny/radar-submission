import {
  Module,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ReceiptDataModule } from './service/receipt/receiptdata.module';
import { AuthModule } from './business-logic/auth/auth.module';
import { SupabaseAuthModule } from './auth/auth.module';
import { AuditModule } from './business-logic/audit/audit.module';
import { CurrentUserService } from './business-logic/audit/current-user.service';
import { BotModule } from './discord-bot/bot.module';
import { TelegrafModule } from './telegraf/telegraf.module';
import { LanguageMiddleware } from './i18n/LanguageMiddleware';
import { ReferralModule } from './business-logic/referral/referral.module';
import { AffiliateModule } from './business-logic/affiliate/affiliate.module';
import { CouponModule } from './business-logic/coupons/coupons.module';
import { StatsModule } from './business-logic/stats/stats.module';
import { ProdegeModule } from './business-logic/prodege/prodege.module';
import { UserModule } from './business-logic/user/user.module';
import { ReceiptModule } from './business-logic/receipt/receipt.module';
import { QuestModule } from './business-logic/quest/quest.module';
import { SurveyModule } from './business-logic/survey/survey.module';
import { TransactionModule } from './business-logic/transaction/transaction.module';
import { SupabaseModule } from './service/supabase/supabase.module';
import { LevelModule } from './business-logic/level/level.module';
import { LitModule } from './service/lit/lit.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `config/.env.${process.env.NODE_ENV}`,
    }),
    SupabaseModule,
    AuditModule, // AuditModule sollte vor anderen Modulen importiert werden, die darauf angewiesen sind
    UserModule,
    AffiliateModule,
    CouponModule,
    ReceiptDataModule,
    AuthModule,
    StatsModule,
    SupabaseAuthModule,
    ReferralModule,
    ReceiptModule,
    QuestModule,
    SurveyModule,
    ReferralModule,
    TransactionModule,
    ProdegeModule,
    LevelModule,
    LitModule
  ],
  providers: [AppService, CurrentUserService],
})
export class AppModule {}
