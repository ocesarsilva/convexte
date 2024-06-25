import { appConfig } from "@/config/app"
import { Icons } from "@/components/icons"

import { AppPageHead } from "../_components/app-page-head"
import { SettingsSidebar } from "./_components/settings-sidebar"
import { SettingsSidebarNav } from "./_components/settings-sidebar-nav"

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
      <div className="p-10 pb-16 pt-3 lg:pt-10">
        <div className="flex w-full flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <SettingsSidebar>
            <SettingsSidebarNav
              orgSlug={orgSlug}
              items={appConfig.sidebarNavItems}
            />
          </SettingsSidebar>

          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </>
  )
}
