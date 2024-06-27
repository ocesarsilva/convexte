"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useFormState } from "react-dom"
import { toast } from "sonner"

import { sendPasswordResetLink } from "@/lib/auth/actions"
import { Paths } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SubmitButton } from "@/components/ui/submit-button"
import { ExclamationTriangleIcon } from "@/components/icons"

export function SendResetEmailForm() {
  const [state, formAction] = useFormState(sendPasswordResetLink, null)
  const router = useRouter()

  useEffect(() => {
    if (state?.success) {
      toast("Um link de redefinição de senha foi enviado para seu e-mail.")
      router.push(Paths.Login)
    }
    if (state?.error) {
      toast(state.error, {
        icon: <ExclamationTriangleIcon className="size-5 text-destructive" />,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state?.error, state?.success])

  return (
    <form className="space-y-4" action={formAction}>
      <div className="space-y-2">
        <Label>Seu email</Label>
        <Input
          required
          placeholder="email@example.com"
          autoComplete="email"
          name="email"
          type="email"
        />
      </div>

      <div className="flex flex-wrap justify-between">
        <Link href={Paths.Signup}>
          <Button variant={"link"} size={"sm"} className="p-0">
            Não se inscreveu? Inscreva-se agora
          </Button>
        </Link>
      </div>

      <SubmitButton className="w-full">Redefinir senha</SubmitButton>
      <Button variant="outline" className="w-full" asChild>
        <Link href="/">Cancelar</Link>
      </Button>
    </form>
  )
}
