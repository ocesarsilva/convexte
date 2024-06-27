"use client"

import Link from "next/link"
import { useFormState } from "react-dom"

import { login } from "@/lib/auth/actions"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { PasswordInput } from "@/components/ui/password-input"
import { SubmitButton } from "@/components/ui/submit-button"

export function LoginForm() {
  const [state, formAction] = useFormState(login, null)

  return (
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
  )
}
