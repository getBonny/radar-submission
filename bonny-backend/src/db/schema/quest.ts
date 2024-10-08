import { pgTable, serial, text, varchar, timestamp, uuid, boolean, real } from "drizzle-orm/pg-core";
import { auditable } from "./auditable";
import { relations } from "drizzle-orm";
import { user } from "./user";
import { survey } from "./survey";
import { transaction } from "./transaction";

export const quest = pgTable("quest", {
    ...auditable,
    id: serial("id").primaryKey(),
    language: varchar("language", { length: 255 }).default('en').notNull(),
    title: varchar("title", { length: 255 }).notNull(),
    description: text("description").notNull(),
    type: varchar("type", { length: 255 }).notNull(),
    imageUrl: text("image_url").notNull(),
    externalUrl: text("external_url").default('').notNull(),
    points: real("points").default(0).notNull(),
    enabled: boolean("enabled").default(true).notNull(),
  });
  
    export const questRelations = relations(quest, ({ many, one }) => ({
    statuses: many(questStatus),
    survey: one(survey, {
      fields: [quest.id],
      references: [survey.id],
    }),
  }));
  
    export type QuestType = typeof quest.$inferSelect;
  export type NewQuestType = typeof quest.$inferInsert;
  
  export const questStatus  = pgTable("quest_status", {
    ...auditable,
    id: serial("id").primaryKey(),
    userId: uuid("user_id").notNull().references(() => user.id),
    questId: serial("quest_id").notNull().references(() => quest.id),
    status: varchar("status", { length: 255 }).notNull(),
    completedDate: timestamp("completed_date").notNull(),
  });
  
  export const questStatusRelations = relations(questStatus, ({ one }) => ({
    user: one(user, {
      fields: [questStatus.userId],
      references: [user.id],
    }),
    quest: one(quest, {
      fields: [questStatus.questId],
      references: [quest.id],
    })
  }));
  
  export type QuestStatusType = typeof questStatus.$inferSelect;
  export type NewQuestStatusType = typeof questStatus.$inferInsert;