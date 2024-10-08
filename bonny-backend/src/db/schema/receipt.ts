import { serial, text, varchar, timestamp, pgTable, integer, real, jsonb } from "drizzle-orm/pg-core";
import { auditable } from "./auditable";
import { relations } from "drizzle-orm";
import { transaction } from "./transaction";

export const receipt = pgTable("receipt", {
    ...auditable,
    id: serial("id").primaryKey(),
    storageUrl: text("storage_url").notNull(),
    supplierName: varchar("supplier_name", { length: 255 }).notNull(),
    supplierLocation: varchar("supplier_location"),
    language: varchar("language", { length: 64 }),
    country: varchar("country", { length: 64 }),
    currency: varchar("currency", { length: 64 }),
    totalAmount: real("total_amount").notNull(),
    paymentMethod: varchar("payment_method"),
    receiptDate: timestamp("receipt_date"),
    qualityScore: integer("quality_score"),
    trustScore: integer("trust_score"),
    hash: varchar("hash", { length: 64 }).notNull(),
    encryptionMetadata: jsonb("encryption_metadata"),
    transactionId: serial("transaction_id").references(() => transaction.id),
  });

  export const receiptRelations = relations(receipt, ({ many, one }) => ({
    transaction: one(transaction, {
      fields: [receipt.transactionId],
      references: [transaction.id],
    }),
    items: many(receiptItem)
  }));
  
  export type ReceiptType = typeof receipt.$inferSelect;
  export type NewReceiptType = typeof receipt.$inferInsert;

  export const receiptItem = pgTable("receipt_item", {
    id: serial("id").primaryKey(),
    receiptId: integer('receipt_id').references(() => receipt.id),
    description: varchar("description").notNull(),
    amount: real("amount"),
    totalPrice: real("total_price")
  })

  export const receiptItemRelations = relations(receiptItem, ({ one }) => ({
    receipt: one(receipt, {
      fields: [receiptItem.receiptId],
      references: [receipt.id]
    })
  }))

  export type ReceiptItemType = typeof receiptItem.$inferSelect;
  export type NewReceiptItemType = typeof receiptItem.$inferInsert;