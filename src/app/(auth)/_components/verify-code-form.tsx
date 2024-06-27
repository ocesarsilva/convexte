"use client"

import { useEffect, useRef } from "react"
import { Label } from "@radix-ui/react-label"
import { useFormState } from "react-dom"
import { toast } from "sonner"

import {
  logout,
  resendVerificationEmail as resendEmail,
  verifyEmail,
} from "@/lib/auth/actions"
import { Input } from "@/components/ui/input"
import { SubmitButton } from "@/components/ui/submit-button"
import { ExclamationTriangleIcon } from "@/components/icons"

export function VerifyCodeForm() {
  const [verifyEmailState, verifyEmailAction] = useFormState(verifyEmail, null)
  const [resendState, resendAction] = useFormState(resendEmail, null)
  const codeFormRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (resendState?.success) {
      toast("Email sent!")
    }
    if (resendState?.error) {
      toast(resendState.error, {
        icon: <ExclamationTriangleIcon className="size-5 text-destructive" />,
      })
    }
  }, [resendState?.error, resendState?.success])

  useEffect(() => {
    if (verifyEmailState?.error) {
      toast(verifyEmailState.error, {
        icon: <ExclamationTriangleIcon className="size-5 text-destructive" />,
      })
    }
  }, [verifyEmailState?.error])

  return (
    <div className="flex flex-col gap-2">
      <form ref={codeFormRef} action={verifyEmailAction}>
        <Label htmlFor="code">Verification code</Label>
        <Input className="mt-2" type="text" id="code" name="code" required />
        <SubmitButton className="mt-4 w-full">Verify</SubmitButton>
      </form>
      <form action={resendAction}>
        <SubmitButton className="w-full" variant="secondary">
          Reenviar código
        </SubmitButton>
      </form>
      <form action={logout}>
        <SubmitButton variant="link" className="p-0 font-normal">
          deseja usar outro e-mail? trocar agora.
        </SubmitButton>
      </form>
    </div>
  )
}
