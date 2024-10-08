import {
  MiddlewareConsumer,
  Module,
  OnModuleInit,
  RequestMethod,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ProfileModule } from './model/profile/profile.module';
import { InjectConnection, TypeOrmModule } from '@nestjs/typeorm';
import { AffiliateModule } from './model/affiliate/affiliate.module';
import { ConfigModule } from '@nestjs/config';
import { HomeModule } from './controller/home/home.module';
import { typeOrmAsyncConfig } from './config/typeorm-config';
import { CouponModule } from './model/coupons/coupons.module';
import { MarketplaceModule } from './controller/marketplace/marketplace.module';
import { ReceiptDataModule } from './service/receipt/receiptdata.module';
import { AdminModule } from './controller/admin/admin.module';
import { AuthModule } from './controller/auth/auth.module';
import { UserModule } from './controller/user/user.module';
import { StatisticsModule } from './controller/stats/statistics.module';
import { FirebaseModule } from './firebase/firebase.module';
import { EntitySubscriber } from './audit/entity-subscriber';
import { AuditModule } from './audit/audit.module';
import databaseConfig from './config/database-config';
import { CurrentUserService } from './audit/current-user.service';
import { Connection } from 'typeorm';
import { ErrorModule } from './controller/error/error.module';
import { LanguageMiddleware } from './i18n/LanguageMiddleware';
import { ProdegeModule } from './controller/prodege/prodege.module';
import { AiModule } from './ai/ai.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
      envFilePath: `config/.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    AuditModule, // AuditModule sollte vor anderen Modulen importiert werden, die darauf angewiesen sind
    ProfileModule,
    AffiliateModule,
    CouponModule,
    HomeModule,
    MarketplaceModule,
    ReceiptDataModule,
    AdminModule,
    AuthModule,
    UserModule,
    StatisticsModule,
    FirebaseModule,
    ErrorModule,
    ProdegeModule,
    AiModule,
  ],
  providers: [AppService, EntitySubscriber, CurrentUserService],
})
export class AppModule implements OnModuleInit {
  constructor(
    @InjectConnection() private readonly connection: Connection,
    private readonly entitySubscriber: EntitySubscriber,
  ) {}

  async onModuleInit() {
    this.connection.subscribers.push(this.entitySubscriber);
  }

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LanguageMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
