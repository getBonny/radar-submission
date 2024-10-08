import { pgTable, serial, varchar, integer } from "drizzle-orm/pg-core";
import { auditable } from "./auditable";
import { survey } from "./survey";
import { relations } from "drizzle-orm";

export const question = pgTable("question", {
    ...auditable,
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    type: varchar("type", { length: 255 }).notNull(),
    order: integer("order").notNull(),
    surveyId: integer("survey_id").notNull().references(() => survey.id),
  });
  
  export const questionRelations = relations(question, ({ many, one }) => ({
    survey: one(survey, {
      fields: [question.surveyId],  
      references: [survey.id],
    }),
    options: many(questionOption),
  }));
  
  export type QuestionType = typeof question.$inferSelect;
  export type NewQuestionType = typeof question.$inferInsert;
  
  export const questionOption = pgTable("question_option", {
    ...auditable,
    id: serial("id").primaryKey(),
    title: varchar("title", { length: 255 }).notNull(),
    order: integer("order").notNull(),
    questionId: integer("question_id").notNull().references(() => question.id),
  });
  
  export const questionOptionRelations = relations(questionOption, ({ one }) => ({
    question: one(question, {
      fields: [questionOption.questionId],
      references: [question.id],
    }),
  }));
  
    export type QuestionOptionType = typeof questionOption.$inferSelect;
  export type NewQuestionOptionType = typeof questionOption.$inferInsert;