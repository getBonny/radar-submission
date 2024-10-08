import { Injectable } from '@nestjs/common';
import { TransactionService } from '../transaction/transaction.service';
import { UserService } from '../user/user.service';
import { dbService } from 'src/db/database.service';
import { eq, and, sql } from 'drizzle-orm';
import { User } from 'src/db/schema';
@Injectable()
export class ReferralService {
  constructor(
    private db: dbService,
    private userService: UserService,
    private transactionService: TransactionService,
  ) {}

  async addReferrer(userId: string, referrerUsername: string) {
    const referrerUser: User = await this.userService.findByUserName(referrerUsername);
    const refereeUser: User = await this.userService.get(userId);

    const referral = {
      refereeUserId: refereeUser.id,
      referrerUserId: referrerUser.id,
    };

    await this.db.client.insert(this.db.schema.referral).values(referral);
    await this.addReferralBonus(refereeUser);
  }

  private async addReferralBonus(refereeUser: User) {
    const bonusAmount: number = 100.0;
    await this.transactionService.addReferralBonusTrx(refereeUser, bonusAmount);
    
    await this.userService.update(refereeUser.id, {
      tokens: refereeUser.tokens + bonusAmount,
    });
  }

  async getTopListReferredUsers(referrerUserId: string) {
    const topReferrals = await this.db.client
      .select({
        userName: this.db.schema.user.userName,
        totalTokens: sql<number>`COALESCE(SUM(${this.db.schema.transaction.tokens}), 0)`,
      })
      .from(this.db.schema.referral)
      .innerJoin(this.db.schema.user, eq(this.db.schema.referral.referrerUserId, this.db.schema.user.id))
      .innerJoin(this.db.schema.user, eq(this.db.schema.referral.refereeUserId, this.db.schema.user.id))
      .leftJoin(
        this.db.schema.transaction,
        and(
          eq(this.db.schema.referral.refereeUserId, this.db.schema.transaction.userId),
          eq(this.db.schema.transaction.type, 'referral_comission')
        )
      )
      .where(eq(this.db.schema.referral.referrerUserId, referrerUserId))
      .groupBy(this.db.schema.user.userName)
      .orderBy(sql`SUM(${this.db.schema.transaction.tokens}) DESC`)
      .execute();

    const referredUserAmount = topReferrals.length;
    const totalComission = topReferrals.reduce((sum, referral) => sum + referral.totalTokens, 0);

    return {
      amountUser: referredUserAmount,
      referrals: topReferrals,
      totalComission: totalComission,
    } as unknown;
  }

  async getReferrer(refereeUserId: string): Promise<User> {
    const referral = await this.db.client.query.referral.findFirst({
      where: eq(this.db.schema.referral.refereeUserId, refereeUserId),
    });

    if (!referral) {
      return null;
    }

    return await this.userService.get(referral.referrerUserId);
  }

  async hasReferrer(refereeUserId: string): Promise<boolean> {
    const referral = await this.db.client.query.referral.findFirst({
      where: eq(this.db.schema.referral.refereeUserId, refereeUserId),
    });

    return !!referral;
  }
}
