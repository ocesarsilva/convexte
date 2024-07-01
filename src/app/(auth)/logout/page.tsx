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

import { LogoutForm } from "../_components/logout-form"

export default async function LogoutPage() {
  const { user } = await validateRequest()

  if (!user) redirect(Paths.Login)

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle>Sair do {APP_TITLE}</CardTitle>
        <CardDescription>Você tem certeza que deseja sair?</CardDescription>
      </CardHeader>
      <CardContent>
        <LogoutForm />
      </CardContent>
    </Card>
  )
}
