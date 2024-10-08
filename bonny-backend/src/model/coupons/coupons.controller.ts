import { Controller, Get, Req } from '@nestjs/common';
import { CouponService } from 'src/model/coupons/coupons.service';

@Controller('coupons')
export class CouponController {
  constructor(private couponService: CouponService) {}

  @Get()
  getCoupons(@Req() req: Request) {
    return this.couponService.getAll(req['language']);
  }
}
