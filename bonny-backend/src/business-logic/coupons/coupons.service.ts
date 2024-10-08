import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { StatsService } from '../stats/stats.service';
import { dbService } from 'src/db/database.service';
import { eq, and } from 'drizzle-orm';
import { Coupon, CouponStatus } from 'src/db/schema';

@Injectable()
export class CouponService {
  constructor(
    private db: dbService,
    private userService: UserService,
    private stats: StatsService
  ) {}

  async getAll(language: string = 'en'): Promise<Coupon[]> {
    return await this.db.client.query.coupon.findMany({
      where: (coupon, { eq }) => eq(coupon.language, language)
    });
  }

  async add(coupon: Coupon): Promise<Coupon> {
    const [newCoupon] = await this.db.client.insert(this.db.schema.coupon).values(coupon).returning();
    return newCoupon;
  }

  async get(id: number): Promise<Coupon | undefined> {
    return await this.db.client.query.coupon.findFirst({
      where: (coupon, { eq }) => eq(coupon.id, id)
    });
  }

  async update(id: number, coupon: Partial<Coupon>): Promise<Coupon | undefined> {
    await this.db.client.update(this.db.schema.coupon)
      .set(coupon)
      .where(eq(this.db.schema.coupon.id, id));
    return this.get(id);
  }

  async remove(id: number): Promise<void> {
    await this.db.client.delete(this.db.schema.coupon)
      .where(eq(this.db.schema.coupon.id, id));
  }

  async getAllActivatedCouponsFromUser(uid: string): Promise<CouponStatus[]> {
    const user = await this.userService.get(uid);
    return await this.db.client.query.couponStatus.findMany({
      where: (couponStatus, { eq }) => eq(couponStatus.userId, user.id),
      with: {
        coupon: true,
      },
    });
  }

  async activateCoupon(uid: string, cid: number): Promise<CouponStatus> {
    const user = await this.userService.get(uid);
    const coupon = await this.get(cid);
    const [status] = await this.db.client.insert(this.db.schema.couponStatus).values({
      userId: user.id,
      couponId: cid,
      status: 'active',
      redeemDate: new Date(),
    }).returning();
    return status;
  }

  async redeemCoupon(uid: string, coupon: Coupon) {
    const user = await this.userService.get(uid);
    await this.db.client.update(this.db.schema.couponStatus)
      .set({ status: 'redeemed' })
      .where(and(
        eq(this.db.schema.couponStatus.couponId, coupon.id),
        eq(this.db.schema.couponStatus.userId, user.id)
      ));

    await this.stats.addCoupon();
  }
}
