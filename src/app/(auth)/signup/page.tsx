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

import { SignUpForm } from "../_components/signup-form"

export const metadata = {
  title: "Sign Up",
  description: "Signup Page",
}

export default async function SignUpPage() {
  const { user } = await validateRequest()

  if (user) redirect(Paths.Dashboard)

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle>Cria sua conta no {APP_TITLE}</CardTitle>
        <CardDescription>
          Cadastre-se para começar a usar o aplicativo
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SignUpForm />
      </CardContent>
    </Card>
  )
}
