import { Module } from '@nestjs/common';
import { CouponService } from './coupons.service';
import { CouponController } from './coupons.controller';
import { StatsModule } from '../stats/stats.module';
import { DbModule } from 'src/db/database.module';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [CouponController],
  providers: [CouponService],
  imports: [
    UserModule,
    StatsModule,
    DbModule
  ],
  exports: [CouponService]
})
export class CouponModule {}
