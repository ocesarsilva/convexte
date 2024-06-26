import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { env } from "@/env"
import { db } from "@/server/db"
import { organization } from "@/server/db/schema"
import { eq } from "drizzle-orm"

import { Card, CardContent, CardHeader } from "@/components/ui/card"

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
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center gap-4">
          <div className="flex size-16 items-center justify-center rounded bg-emerald-500 text-2xl font-bold">
            {org.name.charAt(0).toLocaleUpperCase()}
          </div>
          <div>
            <h3 className="text-2xl font-semibold leading-none tracking-tight">
              {org.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {org.slug}.convexte.com
            </p>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 lg:max-w-2xl">
          <UpdateOrganization org={org} />
        </CardContent>
      </Card>
    </div>
  )
}
