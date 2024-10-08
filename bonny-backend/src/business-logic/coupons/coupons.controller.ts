import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Req } from '@nestjs/common';
import { CouponService } from './coupons.service';
import { Coupon } from 'src/db/schema';

@Controller('coupons')
export class CouponController {
  constructor(private couponService: CouponService) {}

  @Get('all')
  getCoupons(@Req() req: Request) {
    return this.couponService.getAll(req['language']);
  }

  @Post()
  async createCoupon(@Body() coupon: Coupon): Promise<Coupon> {
    return this.couponService.add(coupon);
  }

  @Get(':id')
  async getCoupon(@Param('id') id: string): Promise<Coupon> {
    const coupon = await this.couponService.get(Number(id));
    if (!coupon) {
      throw new HttpException('Coupon not found', HttpStatus.NOT_FOUND);
    }
    return coupon;
  }

  @Put(':id')
  async updateCoupon(@Param('id') id: string, @Body() coupon: Partial<Coupon>): Promise<Coupon> {
    const updatedCoupon = await this.couponService.update(Number(id), coupon);
    if (!updatedCoupon) {
      throw new HttpException('Coupon not found', HttpStatus.NOT_FOUND);
    }
    return updatedCoupon;
  }

  @Delete(':id')
  async deleteCoupon(@Param('id') id: string): Promise<void> {
    await this.couponService.remove(Number(id));
  }
}