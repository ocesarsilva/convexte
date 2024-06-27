import { appConfig } from "@/config/app"
import { PageHeader } from "@/components/layout/page-header"
import { Wrapper } from "@/components/wrapper"

import { SettingsSidebar } from "./_components/settings-sidebar"
import { SettingsTabsbar } from "./_components/settings-tabsbar"

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
      <SettingsTabsbar orgSlug={orgSlug} items={settingsNavItems} />
      <Wrapper>
        <div className="mx-auto flex w-full flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <SettingsSidebar orgSlug={orgSlug} items={settingsNavItems} />

          <div className="flex-1">{children}</div>
        </div>
      </Wrapper>
    </>
  )
}
