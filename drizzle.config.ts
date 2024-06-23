import { env } from "@/env"
import { defineConfig } from "drizzle-kit"

import { DATABASE_PREFIX } from "@/lib/constants"

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/server/db/schema/index.ts",
  out: "./drizzle",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  tablesFilter: [`${DATABASE_PREFIX}_*`],
})
