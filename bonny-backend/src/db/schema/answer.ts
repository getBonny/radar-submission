import { pgTable, serial, varchar, integer, text, uuid } from "drizzle-orm/pg-core";
import { auditable } from "./auditable";
import { questionOption, question } from "./question";
import { relations } from "drizzle-orm";
import { user } from "./user";



export const answer = pgTable("answer", {
    ...auditable,
    id: serial("id").primaryKey(),
    userId: uuid("user_id").notNull().references(() => user.id),
    questionId: integer("question_id").notNull().references(() => question.id),  
    selectedOptionId: integer("selected_option_id").references(() => questionOption.id),
    freeText: text("free_text"),
  });
  
    export const answerRelations = relations(answer, ({ one }) => ({
    profile: one(user, {
      fields: [answer.userId],
      references: [user.id],
    }),
    question: one(question, {
        fields: [answer.questionId],
      references: [question.id],
    }),
    selectedOption: one(questionOption, {
        fields: [answer.selectedOptionId],
      references: [questionOption.id],
    }),
  }));
  
  export type AnswerType = typeof answer.$inferSelect;
  export type NewAnswerType = typeof answer.$inferInsert;
