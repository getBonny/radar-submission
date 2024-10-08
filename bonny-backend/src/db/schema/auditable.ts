import { timestamp, varchar } from "drizzle-orm/pg-core";

export const auditable = {
    createdBy: varchar("created_by", { length: 255 }).default('anonymous').notNull(),
    updatedBy: varchar("updated_by", { length: 255 }).default('anonymous').notNull(),
    createdOn: timestamp("created_on").defaultNow().notNull(),
    updatedOn: timestamp("updated_on").defaultNow().notNull(),
  };
  
export type AuditableType = typeof auditable;
