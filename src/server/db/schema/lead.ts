import { relations } from "drizzle-orm"
import { text, varchar } from "drizzle-orm/pg-core"

import { lifecycleDates, pgTable } from "../utils"
import { form } from "./form"
import { organization } from "./organization"
import { pipeline } from "./pipeline"
import { user } from "./user"

export const lead = pgTable("leads", {
  id: varchar("id", { length: 21 }).primaryKey(),
  name: text("name"),
  email: text("email"),
  phone: text("phone"),

  pipelineId: text("pipeline_id")
    .notNull()
    .references(() => user.id, {
      onDelete: "cascade",
    }),
  formId: text("form_id").references(() => user.id, {
    onDelete: "set null",
  }),
  organizationId: text("organization_id")
    .notNull()
    .references(() => organization.id, { onDelete: "cascade" }),

  ...lifecycleDates,
})

export const leadRelations = relations(lead, ({ one }) => ({
  form: one(form, { fields: [lead.formId], references: [form.id] }),
  organization: one(organization, {
    fields: [lead.id],
    references: [organization.id],
  }),
  pipeline: one(pipeline, {
    fields: [lead.pipelineId],
    references: [pipeline.id],
  }),
}))
