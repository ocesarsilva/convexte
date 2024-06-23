import { PageHead } from "@/components/page-head"

import { env } from "@/env"
import { House } from "lucide-react"

import { type Metadata } from "next"
import * as React from "react"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Home",
}

export default async function DashboardPage() {
  return (
    <div className="flex-1">
      <PageHead title="Home" icon={<House className="size-4" />} />
    </div>
  )
}
