import { DATABASE_PREFIX as prefix } from "@/lib/constants"
import { pgTableCreator } from "drizzle-orm/pg-core"

export const pgTable = pgTableCreator((name) => `${prefix}_${name}`)

import { timestamp } from "drizzle-orm/pg-core"

export const lifecycleDates = {
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).$onUpdate(() => new Date()),
}
