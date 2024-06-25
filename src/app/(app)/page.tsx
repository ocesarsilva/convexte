import { redirect } from "next/navigation"

import { validateRequest } from "@/lib/auth/validate-request"
import { Paths } from "@/lib/constants"
import { getOrganizationsByUserId } from "@/lib/queries/organization"

export default async function AppIndex() {
  const { user } = await validateRequest()

  if (!user) {
    redirect(Paths.Login)
  }

  const organizations = await getOrganizationsByUserId({ userId: user.id })

  if (organizations.length > 0) redirect(`/${organizations[0]?.slug}`)

  return redirect(Paths.Onboarding)
}
