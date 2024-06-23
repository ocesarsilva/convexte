import { pgTableCreator, timestamp } from "drizzle-orm/pg-core"

import { DATABASE_PREFIX as prefix } from "@/lib/constants"

export const pgTable = pgTableCreator((name) => `${prefix}_${name}`)

export const lifecycleDates = {
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).$onUpdate(
    () => new Date()
  ),
}
