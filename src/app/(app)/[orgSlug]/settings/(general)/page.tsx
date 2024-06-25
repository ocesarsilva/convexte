import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { env } from "@/env"
import { db } from "@/server/db"
import { organization } from "@/server/db/schema"
import { eq } from "drizzle-orm"

import { UpdateOrganization } from "./update-organization"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Configurações",
  description: "Gerencie seu as configurações da sua organização.",
}

interface SettingsOrganizationPageProps {
  params: {
    orgSlug: string
  }
}

async function getOrganizationFromParams(
  params: SettingsOrganizationPageProps["params"]
) {
  const { orgSlug } = params

  const org = await db.query.organization.findFirst({
    columns: {
      id: true,
      name: true,
      slug: true,
    },
    where: eq(organization.slug, orgSlug),
  })

  if (!org) return null

  return org
}

export default async function SettingsPage({
  params,
}: {
  params: {
    orgSlug: string
  }
}) {
  const org = await getOrganizationFromParams(params)

  if (!org) {
    notFound()
  }

  return (
    <div className="flex-1">
      <UpdateOrganization org={org} />
    </div>
  )
}
