import { relations } from "drizzle-orm"
import { boolean, index, timestamp, varchar } from "drizzle-orm/pg-core"

import { lifecycleDates, pgTable } from "../utils"
import { organization } from "./organization"

export const user = pgTable(
  "users",
  {
    id: varchar("id", { length: 21 }).primaryKey(),
    email: varchar("email", { length: 255 }).unique().notNull(),
    emailVerified: boolean("email_verified").default(false).notNull(),
    hashedPassword: varchar("hashed_password", { length: 255 }),
    avatar: varchar("avatar", { length: 255 }),

    stripeSubscriptionId: varchar("stripe_subscription_id", { length: 191 }),
    stripePriceId: varchar("stripe_price_id", { length: 191 }),
    stripeCustomerId: varchar("stripe_customer_id", { length: 191 }),
    stripeCurrentPeriodEnd: timestamp("stripe_current_period_end"),

    ...lifecycleDates,
  },
  (t) => ({
    emailIdx: index("user_email_idx").on(t.email),
  })
)

export const userRelations = relations(user, ({ many }) => ({
  companies: many(organization),
}))

export type User = typeof user.$inferSelect
export type NewUser = typeof user.$inferInsert
