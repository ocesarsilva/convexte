import "server-only"

import { unstable_cache as cache } from "next/cache"
import { db } from "@/server/db"
import { pipeline } from "@/server/db/schema"
import { and, eq } from "drizzle-orm"

import { getOrganizationBySlug } from "./organization"

export async function getPipelinesByOrgSlug(input: { orgSlug: string }) {
  const org = await getOrganizationBySlug(input.orgSlug)

  if (!org) {
    throw new Error("Não foi possível encontrar essa organização")
  }

  return await cache(
    async () => {
      return db
        .select()
        .from(pipeline)
        .where(and(eq(pipeline.organizationId, org.id)))
    },
    [`pipelines-${input.orgSlug}`],
    {
      revalidate: 900,
      tags: [`pipelines-${input.orgSlug}`],
    }
  )()
}
