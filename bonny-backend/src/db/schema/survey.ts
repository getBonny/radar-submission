import { pgTable, serial, text, varchar, real } from "drizzle-orm/pg-core";
import { auditable } from "./auditable";
import { relations } from "drizzle-orm";
import { question } from "./question";
import { quest } from "./quest";

export const survey = pgTable("survey", {
    ...auditable,
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    description: text("description").notNull(),
    points: real("points").notNull(),
  });
  
  export const surveyRelations = relations(survey, ({ many, one }) => ({
    questions: many(question),
    quest: one(quest, {
      fields: [survey.id],
      references: [quest.id],
    }),
  }));
  
  export type SurveyType = typeof survey.$inferSelect;
  export type NewSurveyType = typeof survey.$inferInsert;