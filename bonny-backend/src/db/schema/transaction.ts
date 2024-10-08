import { pgTable, serial, varchar, uuid, jsonb, real } from "drizzle-orm/pg-core";
import { auditable } from "./auditable";
import { relations } from "drizzle-orm";
import { receipt } from "./receipt";
import { user } from "./user";
import { questStatus } from "./quest";

export const transaction = pgTable("transaction", {
    ...auditable,
    id: serial("id").primaryKey(),
    userId: uuid("user_id").references(() => user.id).notNull(),
    tokens: real("tokens").notNull(),
    type: varchar("type", { length: 255 }).notNull(),
    typeInfo: jsonb("type_info")
  });
  
    export const transactionRelations = relations(transaction, ({ one }) => ({
      user: one(user, {
        fields: [transaction.userId],
        references: [user.id],
      }),
  }));
  
  export type TransactionType = typeof transaction.$inferSelect;
  export type NewTransactionType = typeof transaction.$inferInsert;

  export enum TRANSACTION_TYPE {
    REFERRAL_BONUS = 'referral_bonus',
    REFERRAL_COMISSION = 'referral_comission',
    QUEST = 'quest',
    COUPON = 'coupon',
    RECEIPT_UPLOAD = 'receipt_upload',
    PRODEGE = 'prodege'
  }

  export interface TxReceiptTypeInfo {
    receipt_id: number
  }