"use client"

import { useEffect } from "react"
import { useFormState } from "react-dom"
import { toast } from "sonner"

import { resetPassword } from "@/lib/auth/actions"
import { Label } from "@/components/ui/label"
import { PasswordInput } from "@/components/ui/password-input"
import { SubmitButton } from "@/components/ui/submit-button"
import { ExclamationTriangleIcon } from "@/components/icons"

export function ResetPasswordForm({ token }: { token: string }) {
  const [state, formAction] = useFormState(resetPassword, null)

  useEffect(() => {
    if (state?.error) {
      toast(state.error, {
        icon: <ExclamationTriangleIcon className="size-5 text-destructive" />,
      })
    }
  }, [state?.error])

  return (
    <form action={formAction} className="space-y-4">
      <input type="hidden" name="token" value={token} />
      <div className="space-y-2">
        <Label>Nova senha</Label>
        <PasswordInput
          name="password"
          required
          autoComplete="new-password"
          placeholder="********"
        />
      </div>
      <SubmitButton className="w-full">Redefinir senha</SubmitButton>
    </form>
  )
}
