import { ExclamationTriangleIcon } from "@/components/icons"

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { validateRequest } from "@/lib/auth/validate-request"
import Link from "next/link"

export async function VerificiationWarning() {
  const { user } = await validateRequest()

  return user?.emailVerified === false ? (
    <Alert className="rounded-lg bg-yellow-50 text-yellow-700 dark:bg-gray-800 dark:text-yellow-400">
      <ExclamationTriangleIcon className="h-5 w-5 !text-yellow-700 dark:!text-yellow-400" />
      <div className="flex lg:items-center">
        <div className="w-full">
          <AlertTitle>Verificação da conta necessária</AlertTitle>
          <AlertDescription>
            Um e-mail de verificação foi enviado para o seu endereço de e-mail. Por favor, verifique
            sua conta para acessar todos os recursos.
          </AlertDescription>
        </div>
        <Button size="sm" asChild>
          <Link href="/verify-email">Verificar e-mail</Link>
        </Button>
      </div>
    </Alert>
  ) : null
}
