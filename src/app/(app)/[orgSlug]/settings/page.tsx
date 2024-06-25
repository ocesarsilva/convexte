import type { Metadata } from "next"
import { env } from "@/env"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Configurações",
  description: "Gerencie seu as configurações da sua empresa.",
}

export default async function BillingPage() {
  return <div className="flex-1"></div>
}
