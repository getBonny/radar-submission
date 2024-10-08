import { pgTable, uuid } from "drizzle-orm/pg-core";
import { auditable } from "./auditable";
import { user } from "./user";
import { relations } from "drizzle-orm";

export const referral = pgTable("referral", {
    ...auditable,
    refereeUserId: uuid("referee_user_id").notNull().references(() => user.id),
    referrerUserId: uuid("referrer_user_id").notNull().references(() => user.id),
  });
  
  export const referralRelations = relations(referral, ({ one }) => ({
    referee: one(user, {
      fields: [referral.refereeUserId],
      references: [user.id],
    }),
    referrer: one(user, {
      fields: [referral.referrerUserId],
      references: [user.id],
    }),
  }));
  
export type ReferralType = typeof referral.$inferSelect;
export type NewReferralType = typeof referral.$inferInsert;
