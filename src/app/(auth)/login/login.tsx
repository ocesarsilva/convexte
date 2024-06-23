"use client"

import Link from "next/link"
import { useFormState } from "react-dom"

import { login } from "@/lib/auth/actions"
import { APP_TITLE } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PasswordInput } from "@/components/password-input"
import { SubmitButton } from "@/components/submit-button"

export function Login() {
  const [state, formAction] = useFormState(login, null)

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle>Acessar conta {APP_TITLE}</CardTitle>
        <CardDescription>
          Faça login em sua conta para acessar seu painel
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="grid gap-4">
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              required
              placeholder="email@example.com"
              autoComplete="email"
              name="email"
              type="email"
            />
          </div>

          <div className="space-y-2">
            <Label>Senha</Label>
            <PasswordInput
              name="password"
              required
              autoComplete="current-password"
              placeholder="********"
            />
          </div>

          <div className="flex flex-wrap justify-between">
            <Button variant={"link"} size={"sm"} className="p-0" asChild>
              <Link href={"/signup"}>Não se inscreveu? Inscreva-se agora.</Link>
            </Button>
            <Button variant={"link"} size={"sm"} className="p-0" asChild>
              <Link href={"/reset-password"}>Esqueceu sua senha?</Link>
            </Button>
          </div>

          {state?.fieldError ? (
            <ul className="list-disc space-y-1 rounded-lg border bg-destructive/10 p-2 text-[0.8rem] font-medium text-destructive">
              {Object.values(state.fieldError).map((err) => (
                <li className="ml-4" key={err}>
                  {err}
                </li>
              ))}
            </ul>
          ) : state?.formError ? (
            <p className="rounded-lg border bg-destructive/10 p-2 text-[0.8rem] font-medium text-destructive">
              {state?.formError}
            </p>
          ) : null}
          <SubmitButton className="w-full">Entrar</SubmitButton>
        </form>
      </CardContent>
    </Card>
  )
}
