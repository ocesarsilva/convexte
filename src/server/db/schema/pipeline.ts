import { relations } from "drizzle-orm"
import { text, varchar } from "drizzle-orm/pg-core"

import { lifecycleDates, pgTable } from "../utils"

import { company } from "./company"

export const pipeline = pgTable("pipelines", {
  id: varchar("id", { length: 21 }).primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").unique(),
  image: text("image"),

  companyId: text("company_id")
    .notNull()
    .references(() => company.id, { onDelete: "cascade" }),

  ...lifecycleDates,
})

export const pipelineRelations = relations(pipeline, ({ one }) => ({
  company: one(company, {
    fields: [pipeline.companyId],
    references: [company.id],
  }),
}))

export type Pipeline = typeof pipeline.$inferSelect
export type NewPipeline = typeof pipeline.$inferInsert
