import { redirect } from "next/navigation"

import { validateRequest } from "@/lib/auth/validate-request"
import { Paths } from "@/lib/constants"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { VerifyCodeForm } from "../_components/verify-code-form"

export const metadata = {
  title: "Verify Email",
  description: "Verify Email Page",
}

export default async function VerifyEmailPage() {
  const { user } = await validateRequest()

  if (!user) redirect(Paths.Login)
  if (user.emailVerified) redirect(Paths.Dashboard)

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Verificar e-mail</CardTitle>
        <CardDescription>
          O código de verificação foi enviado para <strong>{user.email}</strong>
          . Verifique sua pasta de spam se você não consigo encontrar o e-mail.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <VerifyCodeForm />
      </CardContent>
    </Card>
  )
}
