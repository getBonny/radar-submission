import { Injectable } from '@nestjs/common';
import { Receipt, ReceiptItem, ReceiptType } from 'src/db/schema';
import { dbService } from 'src/db/database.service';
import { eq, InferSelectModel } from 'drizzle-orm';

@Injectable()
export class ReceiptService {
  constructor(private db: dbService) {}

  async getAll(): Promise<any[]> {
    const receipts = this.db.client.query.receipt.findMany({
      with: {
        items: true
      }
    });
    return receipts
  }

  async addWithItems(receipt: Omit<Receipt, 'id'> & { items: Omit<ReceiptItem, 'id' | 'receiptId'>[]; }): Promise<Receipt> {
    return await this.db.client.transaction(async (tx) => {
      const [newReceipt] = await tx.insert(this.db.schema.receipt).values(receipt).returning();

      const receiptWithItems = {...newReceipt, items: []}
      
      if (receipt.items && receipt.items.length > 0) {
        const item = await tx.insert(this.db.schema.receiptItem).values(
          receipt.items.map(item => ({ ...item, receiptId: newReceipt.id }))
        ).returning()
        receiptWithItems.items.push(item)
      }

      return receiptWithItems;
    });
  }

  async get(id: number): Promise<any | undefined> {
    const [receipt] = await this.db.client.query.receipt.findMany({
      where: (receipt, { eq }) => eq(receipt.id, id),
      limit: 1
    });
    return receipt;
  }

  async update(id: number, receipt: Partial<ReceiptType>): Promise<ReceiptType | undefined> {
    const [updatedReceipt] = await this.db.client
      .update(this.db.schema.receipt)
      .set(receipt)
      .where(eq(this.db.schema.receipt.id, id))
      .returning();
    return updatedReceipt;
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.db.client
      .delete(this.db.schema.receipt)
      .where(eq(this.db.schema.receipt.id, id))
      .execute();
    return result.length > 0;
  }
}
