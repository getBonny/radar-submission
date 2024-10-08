import { pgTable, serial, text, varchar, integer, timestamp, uuid } from "drizzle-orm/pg-core";
import { auditable } from "./auditable";
import { relations } from "drizzle-orm";
import { user } from "./user";

export const coupon = pgTable("coupon", {
    ...auditable,
    id: serial("id").primaryKey(),
    language: varchar("language", { length: 255 }).default('en').notNull(),
    title: varchar("title", { length: 255 }).notNull(),
    description: text("description").notNull(),
    details: text("details").notNull(),
    type: varchar("type", { length: 255 }).notNull(),
    expiryDate: timestamp("expiry_date").notNull(),
    imageUrl: text("image_url").notNull(),
    multiplier: integer("multiplier").default(0),
  });
  
  export const couponRelations = relations(coupon, ({ many }) => ({
    statuses: many(couponStatus),
  }));
  
  export type CouponType = typeof coupon.$inferSelect;
  export type NewCouponType = typeof coupon.$inferInsert;
  
  export const couponStatus = pgTable("coupon_statuses", {
    ...auditable,
    id: serial("id").primaryKey(),
    userId: uuid("user_id").notNull().references(() => user.id),
    couponId: integer("coupon_id").notNull().references(() => coupon.id),
    status: varchar("status", { length: 255 }).notNull(),
    redeemDate: timestamp("redeem_date").notNull(),
  });
  
  export const couponStatusRelations = relations(couponStatus, ({ one }) => ({
    user: one(user, {
      fields: [couponStatus.userId],
      references: [user.id],
    }),
    coupon: one(coupon, {
      fields: [couponStatus.couponId],
      references: [coupon.id],
    }),
  }));
  
  export type CouponStatusType = typeof couponStatus.$inferSelect;
  export type NewCouponStatusType = typeof couponStatus.$inferInsert;