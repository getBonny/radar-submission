import { relations } from "drizzle-orm";
import { integer, pgTable, primaryKey, real, serial, varchar } from "drizzle-orm/pg-core";

export const level = pgTable('level', {
    id: serial('id').primaryKey(),
    title: varchar('title').notNull(),
    totalTokens: real('total_tokens').notNull(),
    description: varchar('description').notNull(),
  });

  export const levelRelations = relations(level, ({ many }) => ({
    levelToBenefits: many(levelToBenefits)
  }));

  export type LevelType = typeof level.$inferSelect;
  export type NewLevelType = typeof level.$inferInsert;


  export const benefit = pgTable('benefit', {
    id: serial('id').primaryKey(),
    description: varchar('description').notNull()
  })

  export const benefitRelations = relations(benefit, ({ many }) => ({
    levelToBenefits: many(levelToBenefits)
  }));


  export type BenefitType = typeof benefit.$inferSelect;
  export type NewBenefitType = typeof benefit.$inferInsert;


 
  export const levelToBenefits = pgTable('level_to_benefits',
    {
        levelId: integer('level_id').notNull().references(() => level.id),
        benefitId: integer('benefit_id').notNull().references(() => benefit.id)
    },
    (t) => ({
        pk: primaryKey({ columns: [t.levelId, t.benefitId]})
    })
  )

  export const levelToBenefitsRelations = relations(levelToBenefits, ({ one }) => ({
    level: one(level, {
        fields: [levelToBenefits.levelId],
        references: [level.id]
    }),
    benefit: one(benefit, {
        fields: [levelToBenefits.benefitId],
        references: [benefit.id]
    })
  }))
