"use client"

import { useRouter } from "next/navigation"

import { logout } from "@/lib/auth/actions"
import { Button } from "@/components/ui/button"
import { SubmitButton } from "@/components/ui/submit-button"

export function LogoutForm() {
  const router = useRouter()
  return (
    <div className="grid grid-cols-2 gap-2">
      <Button
        className="w-full"
        variant="secondary"
        size="sm"
        onClick={() => router.back()}
      >
        Voltar
        <span className="sr-only">Voltar</span>
      </Button>
      <form action={logout}>
        <SubmitButton className="w-full" size="sm" variant="outline">
          Logout
        </SubmitButton>
      </form>
    </div>
  )
}
