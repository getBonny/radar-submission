import { pgTable, serial, integer, real } from "drizzle-orm/pg-core";

export const stats = pgTable('stats', {
    id: serial('id').primaryKey(),
    totalReceipts: integer('total_receipts').notNull(),
    totalEarned: real('total_earned').notNull(),
    totalQuests: integer('total_quests').notNull(),
    totalCoupons: integer('total_coupons').notNull(),
    totalUsers: integer('total_users').notNull(),
  });

  export type StatsType = typeof stats.$inferSelect;
  export type NewStatsType = typeof stats.$inferInsert;
