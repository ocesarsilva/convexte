import { appConfig } from "@/config/app"
import { PageHeader } from "@/components/layout/page-header"

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
      <PageHeader title="Configurações" icon="settings" />
      <SettingsTabsbar orgSlug={orgSlug} items={settingsNavItems} />
      <div className="px-5 pb-16 pt-3 lg:px-10 lg:pt-10">
        <div className="flex w-full flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <SettingsSidebar orgSlug={orgSlug} items={settingsNavItems} />

          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </>
  )
}
