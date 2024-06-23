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

import { SendResetEmail } from "./send-reset-email"

export const metadata = {
  title: "Forgot Password",
  description: "Forgot Password Page",
}

export default async function ForgotPasswordPage() {
  const { user } = await validateRequest()

  if (user) redirect(Paths.Dashboard)

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Esqueceu sua senha?</CardTitle>
        <CardDescription>
          O link de redefinição de senha será enviado para seu e-mail.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SendResetEmail />
      </CardContent>
    </Card>
  )
}
