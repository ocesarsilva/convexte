import type { Metadata } from "next"
import { env } from "@/env"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { DeleteOrganizationForm } from "@/components/forms/delete-organization-form"

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Configurações",
  description: "Gerencie seu as configurações da sua organização.",
}

export default async function SettingsAdvancedPage({
  params,
}: {
  params: {
    orgSlug: string
  }
}) {
  return (
    <div className="flex-1">
      <Card className="border-destructive bg-destructive/20 lg:max-w-2xl">
        <CardHeader>
          <CardTitle>Excluir organização</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            A zona de perigo da página de exclusão de organização é uma área
            crítica que requer consideração e atenção cuidadosa. Ao excluir um
            organização, todos os dados e recursos desse organização serão
            removidos permanentemente e não poderão ser recuperados.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 lg:max-w-2xl">
          <DeleteOrganizationForm orgSlug={params.orgSlug} />
        </CardContent>
      </Card>
    </div>
  )
}
