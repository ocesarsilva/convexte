"use client"

import Link from "next/link"
import { useFormState } from "react-dom"

import { signup } from "@/lib/auth/actions"
import { APP_TITLE } from "@/lib/constants"
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

export function Signup() {
  const [state, formAction] = useFormState(signup, null)

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle>Cria sua conta no {APP_TITLE}</CardTitle>
        <CardDescription>
          Cadastre-se para começar a usar o aplicativo
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
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
          <div>
            <Link href={"/login"}>
              <span className="p-0 text-xs font-medium underline-offset-4 hover:underline">
                Já se inscreveu? Em vez disso, faça login.
              </span>
            </Link>
          </div>

          <SubmitButton className="w-full">Inscrever-se</SubmitButton>
        </form>
      </CardContent>
    </Card>
  )
}
