import { Icons } from "@/components/icons"

import { AppPageHead } from "../_components/app-page-head"

interface SettingsLayoutProps {
  children: React.ReactNode
  params: {
    orgSlug: string
  }
}

export default function SettingsLayout({
  children,
  params,
}: SettingsLayoutProps) {
  const orgSlug = decodeURIComponent(params.orgSlug)
  return (
    <>
      <AppPageHead
        orgSlug={orgSlug}
        title="Configurações"
        icon={<Icons.settings className="size-4" />}
      />
      {children}
    </>
  )
}
