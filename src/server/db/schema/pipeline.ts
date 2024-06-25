import { relations } from "drizzle-orm"
import { text, varchar } from "drizzle-orm/pg-core"

import { lifecycleDates, pgTable } from "../utils"
import { organization } from "./organization"

export const pipeline = pgTable("pipelines", {
  id: varchar("id", { length: 21 }).primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").unique(),
  image: text("image"),

  organizationId: text("organization_id")
    .notNull()
    .references(() => organization.id, { onDelete: "cascade" }),

  ...lifecycleDates,
})

export const pipelineRelations = relations(pipeline, ({ one }) => ({
  organization: one(organization, {
    fields: [pipeline.organizationId],
    references: [organization.id],
  }),
}))

export type Pipeline = typeof pipeline.$inferSelect
export type NewPipeline = typeof pipeline.$inferInsert
