import React from "react"
import Link from "next/link"
import { type getCompany } from "@/server/api/routers/company/company.service"

interface AppSidebarHeadProps {
  companyPromise: ReturnType<typeof getCompany>
}

export function AppSidebarHead({ companyPromise }: AppSidebarHeadProps) {
  const company = React.use(companyPromise)

  return (
    <Link
      href="#"
      className="flex size-6 items-center justify-center rounded bg-primary text-base font-semibold text-primary-foreground"
    >
      <span className="flex size-2 items-center justify-center text-center text-sm">
        {company?.name.charAt(0).toLocaleUpperCase()}
      </span>
      <span className="sr-only">{company?.name}</span>
    </Link>
  )
}
