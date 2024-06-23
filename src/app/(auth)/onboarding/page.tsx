import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { redirect } from "next/navigation"
import { validateRequest } from "@/lib/auth/validate-request"

import { APP_TITLE, Paths } from "@/lib/constants"

export const metadata = {
  title: "Onboarding",
  description: "Verify Email Page",
}

export default async function VerifyEmailPage() {
  const { user } = await validateRequest()

  if (!user) redirect(Paths.Login)
  if (user.emailVerified) redirect(Paths.Dashboard)

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Welcome to {APP_TITLE}</CardTitle>
        <CardDescription>Let's start by setting up your business</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Work in progress...</p>
      </CardContent>
    </Card>
  )
}
