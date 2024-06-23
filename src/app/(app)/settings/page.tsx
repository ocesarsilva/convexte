import type { Metadata } from "next"
import { redirect } from "next/navigation"
import { env } from "@/env"

import { validateRequest } from "@/lib/auth/validate-request"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Configurações",
  description: "Gerencie seu as configurações da sua empresa.",
}

export default async function BillingPage() {
  const { user } = await validateRequest()

  if (!user) {
    redirect("/signin")
  }

  return <div className="flex-1"></div>
}
