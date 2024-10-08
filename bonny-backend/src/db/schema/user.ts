import { pgTable, varchar, uuid, real } from "drizzle-orm/pg-core";
import { auditable } from "./auditable";
import { relations } from "drizzle-orm";
import { transaction } from "./transaction";
import { affiliateStatus } from "./affiliate";
import { questStatus } from "./quest";
import { couponStatus } from "./coupon";
import { answer } from "./answer";



export const user = pgTable("user", {
    ...auditable,
    id: uuid("id").primaryKey(),
    email: varchar("email", { length: 255 }),
    tokens: real("tokens").notNull(),
    userName: varchar("user_name", { length: 255 }).unique(),
    supporterStatus: varchar("supporter_status", { length: 255 }).default("Newbie"),
    profileUrl: varchar("profile_url")
  });
  
  export const userRelations = relations(user, ({ many }) => ({
    transactions: many(transaction),
    affiliateStatuses: many(affiliateStatus),
    questStatuses: many(questStatus),
    couponStatuses: many(couponStatus),
    questionAnswers: many(answer),
  }));
  
  export type UserType = typeof user.$inferSelect;
  export type NewUserType = typeof user.$inferInsert;