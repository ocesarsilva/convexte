import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { env } from "@/env"
import { api } from "@/trpc/server"

import { CompanyDetailsForm } from "./_components/company-details-form"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Configurações",
  description: "Gerencie seu as configurações da sua empresa.",
}

export default async function BillingPage() {
  return (
    <div className="flex-1">
      {/* <CompanyDetailsForm company={company} /> */}
    </div>
  )
}
