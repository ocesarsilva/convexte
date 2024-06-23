import { boolean, index, text, timestamp, varchar } from "drizzle-orm/pg-core"

import { lifecycleDates, pgTable } from "../utils"
import { company } from "./company"

export const user = pgTable(
  "users",
  {
    id: varchar("id", { length: 21 }).primaryKey(),
    email: varchar("email", { length: 255 }).unique().notNull(),
    emailVerified: boolean("email_verified").default(false).notNull(),
    hashedPassword: varchar("hashed_password", { length: 255 }),
    avatar: varchar("avatar", { length: 255 }),

    companyId: text("company_id").references(() => company.id, { onDelete: "cascade" }),

    stripeSubscriptionId: varchar("stripe_subscription_id", { length: 191 }),
    stripePriceId: varchar("stripe_price_id", { length: 191 }),
    stripeCustomerId: varchar("stripe_customer_id", { length: 191 }),
    stripeCurrentPeriodEnd: timestamp("stripe_current_period_end"),

    ...lifecycleDates,
  },
  (t) => ({
    emailIdx: index("user_email_idx").on(t.email),
  }),
)

export type User = typeof user.$inferSelect
export type NewUser = typeof user.$inferInsert
