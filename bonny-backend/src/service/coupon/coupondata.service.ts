import { Injectable, OnModuleInit } from '@nestjs/common';
import { CouponService } from 'src/business-logic/coupons/coupons.service';

@Injectable()
export class CouponDataService implements OnModuleInit {
  constructor(
    private couponService: CouponService
  ) {}

  onModuleInit() {

  }

  private addCoupon() {
    /*const cid = Number(attributes.couponKey);
    if (Number.isNaN(cid) || cid == 0) {
      tokenAmount = await this.calculateTokenAmount(parsed.totalAmount);
    } else {
      const coupon = await this.couponService.get(cid);
      tokenAmount = await this.calculateTokenAmount(
        parsed.totalAmount,
        coupon,
      );
      await this.couponService.redeemCoupon(attributes.userId, coupon);
    }*/

  }

  
}
