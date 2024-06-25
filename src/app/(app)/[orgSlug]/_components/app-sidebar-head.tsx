import React from "react"
import Link from "next/link"

import { type getOrganizationsByUserId } from "@/lib/queries/organization"

interface AppSidebarHeadProps {
  organizationsPromise: ReturnType<typeof getOrganizationsByUserId>
}

export function AppSidebarHead({ organizationsPromise }: AppSidebarHeadProps) {
  const organizations = React.use(organizationsPromise)

  const organization = organizations[0]
  return (
    <Link
      href="#"
      className="flex size-6 items-center justify-center rounded bg-primary text-base font-semibold text-primary-foreground"
    >
      <span className="flex size-2 items-center justify-center text-center text-sm">
        {organization?.name.charAt(0).toLocaleUpperCase()}
      </span>
      <span className="sr-only">{organization?.name}</span>
    </Link>
  )
}
