import * as React from "react"
import { type Metadata } from "next"
import { redirect } from "next/navigation"

import { validateRequest } from "@/lib/auth/validate-request"
import { Paths } from "@/lib/constants"
import { Onboarding } from "./_components/onboarding"

export const metadata: Metadata = {
  title: "Onboarding",
  description: "Comece configurado sua empresa",
}

export default async function OnboardingPage() {
  const { user } = await validateRequest()

  if (!user) {
    redirect(Paths.Login)
  }

  return <Onboarding />
}
