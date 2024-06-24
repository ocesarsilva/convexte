import { relations } from "drizzle-orm"
import { text, varchar } from "drizzle-orm/pg-core"

import { lifecycleDates, pgTable } from "../utils"
import { pipeline } from "./pipeline"
import { user } from "./user"

export const organization = pgTable("organizations", {
  id: varchar("id", { length: 21 }).primaryKey(),
  name: text("name").notNull(),
  slug: text("slug").unique().notNull(),
  image: text("image"),

  ownerId: text("owner_id").references(() => user.id, {
    onDelete: "cascade",
  }),

  ...lifecycleDates,
})

export const organizationRelations = relations(
  organization,
  ({ many, one }) => ({
    owner: one(user, { fields: [organization.ownerId], references: [user.id] }),
    pipelines: many(pipeline),
  })
)

export type Organization = typeof organization.$inferSelect
export type NewOrganization = typeof organization.$inferInsert
