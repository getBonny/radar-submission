import { Injectable } from '@nestjs/common';
import { Transaction } from 'src/db/schema';
import { dbService } from 'src/db/database.service';
import { eq } from 'drizzle-orm';
import { User } from 'src/db/schema';
import { Receipt } from 'src/db/schema';
import { TRANSACTION_TYPE } from 'src/db/schema/transaction';

@Injectable()
export class TransactionService {
  constructor(private db: dbService) {}

  async getAll(): Promise<(Transaction & { receipt: Receipt[] })[]> {

    //@ts-ignore
    return await this.db.client.query.transaction.findMany({
      with: {
        receipt: true,
      },
    });
  }

  async add(transaction: Omit<Transaction, 'id'>): Promise<Transaction> {
    const [newTransaction] = await this.db.client.insert(this.db.schema.transaction)
      .values(transaction)
      .returning();
    return newTransaction;
  }

  async addReferralBonusTrx(
    refereeUser: User,
    bonusAmount: number,
  ): Promise<Transaction> {
    const [newTransaction] = await this.db.client.insert(this.db.schema.transaction)
      .values({
        id: 0,
        type: TRANSACTION_TYPE.REFERRAL_BONUS,
        tokens: bonusAmount,
        userId: refereeUser.id,
        typeInfo: {}
      } as Transaction)
      .returning();
    return newTransaction;
  }

  async addReferralComissionTrx(refereeUser: User, comission: number): Promise<Transaction> {
    const [comissionTrx] = await this.db.client.insert(this.db.schema.transaction)
      .values({
        userId: refereeUser.id,
        tokens: comission,
        type: TRANSACTION_TYPE.REFERRAL_COMISSION,
        typeInfo: {},
      } as Transaction)
      .returning();
    return comissionTrx;
  }

  async getByUser(uid: string): Promise<Transaction[]> {
    return await this.db.client.query.transaction.findMany({
      where: eq(this.db.schema.transaction.userId, uid),
    });
  }

  async get(id: number): Promise<Transaction> {
    return await this.db.client.query.transaction.findFirst({
      where: eq(this.db.schema.transaction.id, id),
    });
  }

  async update(
    id: number,
    transaction: Partial<Transaction>,
  ): Promise<Transaction> {
    await this.db.client.update(this.db.schema.transaction)
      .set(transaction)
      .where(eq(this.db.schema.transaction.id, id));
    return this.get(id);
  }
}
