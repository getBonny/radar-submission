import { Injectable } from '@nestjs/common';
import { dbService } from 'src/db/database.service';
import { eq } from 'drizzle-orm';
import { Stats } from 'src/db/schema';
import { Quest } from 'src/db/schema';
@Injectable()
export class StatsService {
  constructor(private db: dbService) {}

  async get(): Promise<Stats> {
    return await this.db.client.query.stats.findFirst({
      where: (stats, { eq }) => eq(stats.id, 1)
    });
  }

  async addUser() {
    const stats = await this.get();
    await this.db.client.update(this.db.schema.stats)
      .set({ totalUsers: stats.totalUsers + 1 })
      .where(eq(this.db.schema.stats.id, 1))
      .execute();
  }

  async addQuest(quest: Quest) {
    const stats = await this.get();
    await this.db.client.update(this.db.schema.stats)
      .set({ 
        totalQuests: stats.totalQuests + 1, 
        totalEarned: (Number(stats.totalEarned) + quest.points) 
      })
      .where(eq(this.db.schema.stats.id, 1))
      .execute();
  }

  async addCoupon() {
    const stats = await this.get();
    await this.db.client.update(this.db.schema.stats)
      .set({ totalCoupons: stats.totalCoupons + 1 })
      .where(eq(this.db.schema.stats.id, 1))
      .execute();
  }

  async addReceipt(amount: number) {
    const stats = await this.get();
    await this.db.client.update(this.db.schema.stats)
      .set({ 
        totalReceipts: stats.totalReceipts + 1, 
        totalEarned: (Number(stats.totalEarned) + amount) 
      })
      .where(eq(this.db.schema.stats.id, 1))
      .execute();
  }

  async getUserStats(){}


}
