import { redirect } from "next/navigation"

import { validateRequest } from "@/lib/auth/validate-request"
import { APP_TITLE, Paths } from "@/lib/constants"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { LoginForm } from "../_components/login-form"

export const metadata = {
  title: "Login",
  description: "Login Page",
}

export default async function LoginPage() {
  const { user } = await validateRequest()

  if (user) redirect(Paths.Dashboard)

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle>Acessar conta {APP_TITLE}</CardTitle>
        <CardDescription>
          Faça login em sua conta para acessar seu painel
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
      </CardContent>
    </Card>
  )
}
