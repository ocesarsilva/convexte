import "server-only"

import { unstable_cache as cache } from "next/cache"
import { db } from "@/server/db"
import { organization } from "@/server/db/schema"
import { eq } from "drizzle-orm"

export async function getOrganizationsByUserId(input: { userId: string }) {
  return await cache(
    async () => {
      return db
        .select({
          id: organization.id,
          name: organization.name,
          slug: organization.slug,
          image: organization.image,
        })
        .from(organization)
        .where(eq(organization.ownerId, input.userId))
    },
    [`organizations-${input.userId}`],
    {
      revalidate: 900,
      tags: [`organizations-${input.userId}`],
    }
  )()
}
