import { appConfig } from "@/config/app"
import { PageHeader } from "@/components/layout/page-header"
import { SettingsSidebar } from "@/components/layout/settings-sidebar"
import { Wrapper } from "@/components/wrapper"

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
  const { settingsNavItems } = appConfig

  return (
    <>
      <PageHeader title="Configurações" />

      <Wrapper variant="settings">
        <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
          <SettingsSidebar orgSlug={orgSlug} items={settingsNavItems} />

          {children}
        </div>
      </Wrapper>
    </>
  )
}
