import { pgTable, serial, text, varchar, uuid, timestamp } from "drizzle-orm/pg-core";
import { auditable } from "./auditable";
import { relations } from "drizzle-orm";
import { user } from "./user";

export const affiliate = pgTable("affiliate", {
    ...auditable,
    id: serial("id").primaryKey(),
    language: varchar("language", { length: 255 }).default('en').notNull(),
    title: varchar("title", { length: 255 }).notNull(),
    description: text("description").notNull(),
    imageUrl: text("image_url").notNull(),
    externalUrl: text("external_url").notNull(),
  });

  export const affiliateRelations = relations(affiliate, ({ many }) => ({
    statuses: many(affiliateStatus),
  }));
  
  export type AffiliateType = typeof affiliate.$inferSelect;
  export type NewAffiliateType = typeof affiliate.$inferInsert;
  

  export const affiliateStatus = pgTable("affiliate_status", {
    ...auditable,
    id: serial("id").primaryKey(),
    userId: uuid("user_id").notNull().references(() => user.id),
    affiliateId: serial("affiliate_id").notNull().references(() => affiliate.id),
    status: varchar("status", { length: 255 }).notNull(),
    purchaseDate: timestamp("purchase_date").notNull(),
  });
  
  export const affiliateStatusRelations = relations(affiliateStatus, ({ one }) => ({
    user: one(user, {
      fields: [affiliateStatus.userId],
      references: [user.id],
    }),
      affiliate: one(affiliate, {
      fields: [affiliateStatus.affiliateId],
        references: [affiliate.id],
    }),
  }));
  
  export type AffiliateStatusType = typeof affiliateStatus.$inferSelect;
  export type NewAffiliateStatusType = typeof affiliateStatus.$inferInsert;