import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { ResetPasswordForm } from "../../_components/reset-password-form"

export const metadata = {
  title: "Reset Password",
  description: "Reset Password Page",
}

export default function ResetPasswordPage({
  params,
}: {
  params: { token: string }
}) {
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <CardTitle>Redefinir senha</CardTitle>
        <CardDescription>Insira a nova senha.</CardDescription>
      </CardHeader>
      <CardContent>
        <ResetPasswordForm token={params.token} />
      </CardContent>
    </Card>
  )
}
