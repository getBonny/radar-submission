import { Module } from '@nestjs/common';
import { CouponDataService } from './coupondata.service';

@Module({
  providers: [CouponDataService],
  imports: [
  ],
})
export class CouponDataModule {}
