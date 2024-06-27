import { relations } from "drizzle-orm"
import { boolean, text, varchar } from "drizzle-orm/pg-core"

import { pgTable } from "../utils"
import { lead } from "./lead"
import { pipeline } from "./pipeline"
import { user } from "./user"

export const form = pgTable("forms", {
  id: varchar("id", { length: 21 }).primaryKey(),
  name: boolean("name"),
  email: boolean("email"),
  phone: boolean("phone"),
  dataOfBirth: boolean("date_of_birth"),

  pipelineId: text("pipeline_id").references(() => user.id, {
    onDelete: "cascade",
  }),
})

export const formRelations = relations(form, ({ many, one }) => ({
  leads: many(lead),
  pipeline: one(pipeline, {
    fields: [form.pipelineId],
    references: [pipeline.id],
  }),
}))
