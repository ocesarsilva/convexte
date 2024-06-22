import { DATABASE_PREFIX as prefix } from "@/lib/constants"
import { pgTableCreator } from "drizzle-orm/pg-core"

export const pgTable = pgTableCreator((name) => `${prefix}_${name}`)
