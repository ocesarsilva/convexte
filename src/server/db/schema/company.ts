import { relations } from "drizzle-orm"
import { text, varchar } from "drizzle-orm/pg-core"

import { lifecycleDates, pgTable } from "../utils"

import { pipeline } from "./pipeline"

export const company = pgTable("companies", {
  id: varchar("id", { length: 21 }).primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").unique().notNull(),
  image: text("image"),

  ...lifecycleDates,
})

export const companyRelations = relations(company, ({ many }) => ({
  pipelines: many(pipeline),
}))

export type Company = typeof company.$inferSelect
export type NewCompany = typeof company.$inferInsert
